import { copyFile } from 'node:fs/promises'
import { consola } from 'consola'
import { resolve } from './utils'

interface Wasm {
  from: string
  to: string
}

export async function syncWasm(from: string, to: string) {
  await copyFile(resolve(`node_modules/${from}`), resolve(`public/wasm/${to}`))
}

const wasmList: Wasm[] = [
  {
    from: 'lightningcss-wasm/lightningcss_node.wasm',
    to: 'lightningcss_node.wasm',
  },
]

;(async () => {
  const pAll = Promise.all(wasmList.map(v => syncWasm(v.from, v.to)))

  pAll
    .then(() => {
      consola.success('All wasm synced')
    })
    .catch(err => {
      consola.fail('sync failed', err)
    })
})()
