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
  <div class="relative h-screen flex-center">
    <div class="relative">
      <p class="mb-4 text-lg">
        <span class="text-1.2em text-green">{{ count }}</span> files created.
      </p>
      <div class="flex items-center gap-6">
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
