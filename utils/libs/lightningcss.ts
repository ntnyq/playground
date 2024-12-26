import type { TransformOptions } from 'lightningcss-wasm'

const encoder = new TextEncoder()
const decoder = new TextDecoder()

export interface Options extends Partial<TransformOptions<{}>> {}

let lightningcss: Promise<typeof import('lightningcss-wasm')>

export async function transformViaLightningCSS(code: string, options: Options = {}) {
  if (!lightningcss) {
    lightningcss = import('lightningcss-wasm').then(async r => {
      await r.default('/wasm/lightningcss_node.wasm')
      return r
    })
  }
  const { filename = 'css.css', minify = true } = options
  const { transform } = await lightningcss

  const minified = transform({
    code: encoder.encode(code),
    filename,
    minify,
    ...options,
  })

  return decoder.decode(minified.code) || ''
}
