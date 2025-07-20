<script lang="ts" setup>
const targetElRef = useTemplateRef('targetElRef')
const { scale, zoomIn, zoomOut } = useZoomElement(targetElRef)
</script>

<template>
  <CenterContainer>
    <div
      ref="targetElRef"
      class="h-600px w-600px flex-center border border-orange"
    >
      <div
        ref="targetElRef"
        :style="{
          transform: `scale(${scale})`,
        }"
        class="h-200px w-200px bg-red"
      />

      <div class="absolute bottom-2 right-2">
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
