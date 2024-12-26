import { createPlainShiki } from 'plain-shiki'
import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import grammerCSS from 'shiki/langs/css.mjs'
import grammerJavaScript from 'shiki/langs/javascript.mjs'
import grammerTypeScript from 'shiki/langs/typescript.mjs'
import githubDark from 'shiki/themes/github-dark.mjs'
import githubLight from 'shiki/themes/github-light.mjs'
import type { CreatePlainShikiReturns, MountPlainShikiOptions } from 'plain-shiki'
import type { HighlighterCore } from 'shiki/core'

export type UsePlainShikiOptions = Omit<MountPlainShikiOptions, 'lang'> & {
  lang: 'javascript' | 'typescript' | 'css'
  enabled?: boolean
  immediate?: boolean
}

let shikiPromise: Promise<HighlighterCore> | undefined

export function usePlainShiki(
  el: MaybeRefOrGetter<HTMLElement | null>,
  options: UsePlainShikiOptions,
) {
  const { lang, enabled = true, immediate = true } = options
  const target = toRef(el)

  let plain: CreatePlainShikiReturns
  let ctx: ReturnType<(typeof plain)['mount']> | undefined

  const { trigger } = watchTriggerable(target, () => {
    ctx?.dispose()
    if (enabled && target.value) {
      ctx = plain?.mount(target.value, {
        ...options,
        lang,
      })
    }
  })

  tryOnMounted(async () => {
    shikiPromise ||= createHighlighterCore({
      langs: [grammerJavaScript, grammerTypeScript, grammerCSS],
      themes: [githubLight, githubDark],
      engine: createJavaScriptRegexEngine(),
    })

    plain = createPlainShiki(await shikiPromise)

    if (immediate) {
      trigger()
    }
  })

  tryOnUnmounted(() => {
    ctx?.dispose()
  })

  function update() {
    ctx?.update()
  }

  return {
    trigger,
    update,
  }
}
