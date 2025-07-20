<script lang="ts" setup>
const containerRef = useTemplateRef('containerRef')
const indicatorRef = useTemplateRef('indicatorRef')
const cardLeftRef = useTemplateRef('cardLeftRef')
const cardRightRef = useTemplateRef('cardRightRef')

const indicatorPercentage = useCssVar('--clip-percentage', indicatorRef)
const cardLeftPercentage = useCssVar('--clip-percentage', cardLeftRef)
const cardRightPercentage = useCssVar('--clip-percentage', cardRightRef)

const { left, width } = useElementBounding(containerRef)

function updateClipPercentage(percentage: number) {
  cardLeftPercentage.value = `${100 - percentage}%`
  cardRightPercentage.value = `${percentage}%`
  indicatorPercentage.value = `${percentage}%`
}

function handleMouseMove(event: MouseEvent) {
  const mouseX = event.clientX - left.value
  const clipPercentage = (mouseX / width.value) * 100

  updateClipPercentage(clipPercentage)
}

useEventListener(containerRef, 'mousemove', handleMouseMove)

onMounted(() => {
  updateClipPercentage(50)
})
</script>

<template>
  <CenterContainer>
    <div class="relative flex flex-col gap-4">
      <div
        ref="containerRef"
        class="of-hidden border border-dashed"
      >
        <div class="relative z-4">
          <div
            ref="indicatorRef"
            class="from transparent absolute left-$clip-percentage z-10 w-0.5 rounded-full via-white to-transparent bg-gradient-to-b -inset-y-4"
          >
            <div
              class="absolute inset-y-4 w-12 rounded-full from-transparent via-primary:75 to-transparent bg-gradient-to-r blur-md -left-6"
            />
            <div class="absolute inset-y-4 z-10 -inset-x-14">
              <div class="absolute inset-0 wh-full bg-black" />
            </div>
          </div>
        </div>

        <div
          ref="cardLeftRef"
          class="[clip-path:inset(0px_var(--clip-percentage)_0px_0px)] ml-auto h-full flex flex-col justify-between border-gray-200"
        >
          <slot name="left" />
        </div>
        <div
          ref="cardRightRef"
          class="[clip-path:inset(0px_0px_0px_var(--clip-percentage))] absolute inset-0 ml-auto h-full flex flex-col justify-between border-gray-800 shadow-lg"
        >
          <slot name="right" />
        </div>
      </div>

      <div class="relative">
        <slot name="footer" />
      </div>
    </div>
  </CenterContainer>
</template>
