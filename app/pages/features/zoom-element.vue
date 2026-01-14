<script lang="ts" setup>
const targetElRef = useTemplateRef('targetElRef')
const { scale, zoomIn, zoomOut } = useZoomElement(targetElRef)
</script>

<template>
  <CenterContainer>
    <div
      ref="targetElRef"
      class="border border-orange flex-center h-600px w-600px"
    >
      <div
        ref="targetElRef"
        :style="{
          transform: `scale(${scale})`,
        }"
        class="bg-red h-200px w-200px"
      />

      <div class="bottom-2 right-2 absolute">
        <IconButton
          @click="zoomIn()"
          icon="i-ri:add-circle-line"
        />
        <IconButton
          @click="zoomOut()"
          icon="i-ri:indeterminate-circle-line"
        />
      </div>
    </div>
  </CenterContainer>
</template>
