import type { MaybeElementRef } from '@vueuse/core'

const DEFAULT_FACTOR = 0.2

interface UseZoomElementOptions {
  /**
   * @default true
   */
  wheel?: MaybeRef<boolean>

  /**
   * @default 0.5
   */
  minScale?: number

  /**
   * @default 2
   */
  maxScale?: number

  /**
   * @default 0.2
   */
  zoomFactor?: number

  /**
   * @default 1
   */
  initScale?: number
}

export function useZoomElement(
  target: MaybeElementRef<HTMLElement | null>,
  options: UseZoomElementOptions = {},
) {
  const {
    wheel = true,
    zoomFactor = DEFAULT_FACTOR,
    initScale = 1,
    minScale = 0.5,
    maxScale = 2,
  } = options

  const scale = ref(initScale)

  function zoom(factor: number, clientX?: number, clientY?: number) {
    const el = toValue(target)

    if (!el) {
      return
    }

    const { left, top, width, height } = el.getBoundingClientRect()

    // default to center
    const x = clientX ?? left + width / 2
    const y = clientY ?? top + height / 2

    const offsetX = x - left
    const offsetY = y - top
    const oldScale = scale.value

    console.log({
      minScale,
      maxScale,
      oldScale,
      factor,
    })

    scale.value = Math.max(minScale, Math.min(maxScale, oldScale + factor))

    const ratio = scale.value / oldScale

    // Adjust scroll so that the zoom center is kept in place
    el.scrollLeft = (el.scrollLeft + offsetX) * ratio - offsetX
    el.scrollTop = (el.scrollTop + offsetY) * ratio - offsetY
  }

  function zoomIn(factor = zoomFactor) {
    zoom(factor)
  }

  function zoomOut(factor = zoomFactor) {
    zoom(factor * -1)
  }

  function handleWheel(event: WheelEvent) {
    if (!toValue(wheel)) {
      return
    }
    event.preventDefault()
    zoom(
      event.deltaY > 0 ? zoomFactor : zoomFactor * -1,
      event.clientX,
      event.clientY,
    )
  }

  useEventListener(target, 'wheel', handleWheel)

  return {
    scale,
    zoom,
    zoomIn,
    zoomOut,
  }
}
