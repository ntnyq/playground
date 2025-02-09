<script lang="ts" setup>
import tsBlankSpace from 'ts-blank-space'
import typescriptSample from '@/constants/samples/typescript.sample?raw'
import { formatViaPrettier } from '~/utils/libs/prettier'

const typescriptCode = ref(typescriptSample)
const javascriptCode = ref('')

async function removeTypes() {
  const result = tsBlankSpace(typescriptCode.value, err => {
    console.log(err)
  })
  javascriptCode.value = await formatViaPrettier(result)
}

watch(
  typescriptCode,
  () => {
    removeTypes()
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div class="relative h-screen">
    <div class="relative mx-auto h-full gap-2 lg:(flex gap-4 px-20)">
      <div class="relative flex flex-col lg:w-1/2">
        <h2
          class="flex-center flex-none py-4 text-center text-2xl font-semibold"
        >
          <div class="i-vscode-icons:file-type-typescript-official mr-2" />
          <span>TypeScript</span>
        </h2>
        <div
          class="relative flex-1 of-y-auto border border-zinc-300 dark:border-zinc-600"
        >
          <HighlightEditor
            v-model="typescriptCode"
            input-class="min-h-400px"
            class="p-4"
          />
        </div>
      </div>
      <div class="relative flex flex-col lg:w-1/2">
        <h2
          class="flex-center flex-none py-4 text-center text-2xl font-semibold"
        >
          <div class="i-vscode-icons:file-type-js-official mr-2" />
          <span>JavaScript</span>
        </h2>
        <div
          class="relative flex-1 of-y-auto border border-zinc-300 dark:border-zinc-600"
        >
          <HighlightEditor
            :model-value="javascriptCode"
            lang="javascript"
            input-class="min-h-400px"
            class="p-4"
          />
        </div>
      </div>
    </div>
  </div>
</template>
