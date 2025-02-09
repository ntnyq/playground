<script lang="ts" setup>
import cssSample from '@/constants/samples/css.sample?raw'
import { transformViaLightningCSS } from '~/utils/libs/lightningcss'

const raw = ref(cssSample)
const minified = ref('')

async function minify() {
  const result = await transformViaLightningCSS(raw.value)

  minified.value = result
}

watch(
  raw,
  () => {
    minify()
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
          <div class="i-vscode-icons:file-type-css mr-2" />
          <span>Raw</span>
        </h2>
        <div
          class="relative flex-1 of-y-auto border border-zinc-300 dark:border-zinc-600"
        >
          <HighlightEditor
            v-model="raw"
            lang="css"
            input-class="min-h-400px"
            class="p-4"
          />
        </div>
      </div>
      <div class="relative flex flex-col lg:w-1/2">
        <h2
          class="flex-center flex-none py-4 text-center text-2xl font-semibold"
        >
          <div class="i-vscode-icons:file-type-css mr-2" />
          <span>Minified</span>
        </h2>
        <div
          class="relative flex-1 of-y-auto border border-zinc-300 dark:border-zinc-600"
        >
          <HighlightEditor
            :model-value="minified"
            lang="css"
            input-class="min-h-400px"
            class="p-4"
          />
        </div>
      </div>
    </div>
  </div>
</template>
