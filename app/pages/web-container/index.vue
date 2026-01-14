<script lang="ts" setup>
const iframeRef = useTemplateRef('iframeRef')

const webContainer = useWebContainer(iframeRef)

onMounted(() => {
  webContainer.load()
})
</script>

<template>
  <div class="flex-center h-screen relative">
    <iframe
      ref="iframeRef"
      class="h-full w-full"
      frameborder="0"
    />
  </div>
</template>
