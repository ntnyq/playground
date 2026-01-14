<script lang="ts" setup>
const { count, createFolder, createFile, download } = useZip()

const FOLDER = 'texts'

function handleDownload() {
  download()
}

function handleAddFile() {
  const text = crypto.randomUUID()
  createFile(`${FOLDER}/${text}.txt`, text)
}

onMounted(() => {
  createFolder(FOLDER)
})
</script>

<template>
  <div class="flex-center h-screen relative">
    <div class="relative">
      <p class="text-lg mb-4">
        <span class="text-1.2em text-green">{{ count }}</span> files created.
      </p>
      <div class="flex gap-6 items-center">
        <SimpleButton
          @click="handleAddFile"
          title="Add File"
        />
        <SimpleButton
          @click="handleDownload"
          title="Download"
        />
      </div>
    </div>
  </div>
</template>
