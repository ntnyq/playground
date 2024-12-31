import { copyFile, mkdir } from 'node:fs/promises'
import { consola } from 'consola'
import { glob } from 'tinyglobby'
import { resolve } from './utils'

interface SyncOptions {
  from: string
  to: string
  cwd?: string
  glob?: boolean
  createFolder?: boolean
}

export async function syncWasm(options: SyncOptions) {
  if (options.createFolder) {
    await mkdir(resolve(`public/wasm/${options.to}`), {
      recursive: true,
    })
  }
  if (options.glob) {
    const files = await glob(options.from, {
      onlyFiles: true,
      cwd: `node_modules/${options.cwd}`,
    })
    await Promise.all(
      files.map(v =>
        copyFile(`node_modules/${options.cwd}/${v}`, resolve(`public/wasm/${options.to}/${v}`)),
      ),
    )
  } else {
    await copyFile(resolve(`node_modules/${options.from}`), resolve(`public/wasm/${options.to}`))
  }
}

const wasmList: SyncOptions[] = [
  {
    from: 'lightningcss-wasm/lightningcss_node.wasm',
    to: 'lightningcss_node.wasm',
  },
  {
    from: '*',
    cwd: 'onnxruntime-web/dist',
    to: 'ort',
    glob: true,
    createFolder: true,
  },
]

;(async () => {
  const pAll = Promise.all(wasmList.map(v => syncWasm(v)))

  pAll
    .then(() => {
      consola.success('All wasm synced')
    })
    .catch(err => {
      consola.fail('sync failed', err)
    })
})()
