<script lang="ts" setup>
const iframeRef = useTemplateRef('iframeRef')

const webContainer = useWebContainer(iframeRef)

onMounted(() => {
  webContainer.load()
})
</script>

<template>
  <div class="relative h-screen flex-center">
    <iframe
      ref="iframeRef"
      class="h-full w-full"
      frameborder="0"
    />
  </div>
</template>
