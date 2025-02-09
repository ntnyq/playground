import { createHighlighterCore } from '@shikijs/core'
import { createJavaScriptRegexEngine } from '@shikijs/engine-javascript'
import githubDark from '@shikijs/themes/github-dark'
import githubLight from '@shikijs/themes/github-light'
import { createPlainShiki } from 'plain-shiki'
import type { HighlighterCore } from '@shikijs/core'
import type {
  CreatePlainShikiReturns,
  MountPlainShikiOptions,
} from 'plain-shiki'

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
      langs: [
        import('@shikijs/langs-precompiled/css'),
        import('@shikijs/langs-precompiled/javascript'),
        import('@shikijs/langs-precompiled/typescript'),
      ],
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
