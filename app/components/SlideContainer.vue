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
    <div class="flex flex-col gap-4 relative">
      <div
        ref="containerRef"
        class="border border-dashed of-hidden"
      >
        <div class="relative z-4">
          <div
            ref="indicatorRef"
            class="from transparent rounded-full w-0.5 left-$clip-percentage absolute z-10 to-transparent via-white bg-gradient-to-b -inset-y-4"
          >
            <div
              class="rounded-full w-12 inset-y-4 absolute from-transparent to-transparent via-primary:75 bg-gradient-to-r blur-md -left-6"
            />
            <div class="inset-y-4 absolute z-10 -inset-x-14">
              <div class="bg-black wh-full inset-0 absolute" />
            </div>
          </div>
        </div>

        <div
          ref="cardLeftRef"
          class="ml-auto border-gray-200 flex flex-col h-full [clip-path:inset(0px_var(--clip-percentage)_0px_0px)] justify-between"
        >
          <slot name="left" />
        </div>
        <div
          ref="cardRightRef"
          class="ml-auto border-gray-800 flex flex-col h-full shadow-lg [clip-path:inset(0px_0px_0px_var(--clip-percentage))] inset-0 justify-between absolute"
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
