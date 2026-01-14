<script lang="ts" setup>
import cssSample from '@/constants/samples/css.sample?raw'
import { transformViaLightningCSS } from '~/utils/libs/lightningcss'

const raw = ref(cssSample)
const minified = ref('')

watchEffect(async () => {
  minified.value = await transformViaLightningCSS(raw.value)
})
</script>

<template>
  <div class="h-screen relative">
    <div class="mx-auto gap-2 h-full relative lg:(px-20 flex gap-4)">
      <div class="flex flex-col relative lg:w-1/2">
        <h2
          class="text-2xl font-semibold py-4 text-center flex-center flex-none"
        >
          <div class="i-vscode-icons:file-type-css mr-2" />
          <span>Raw</span>
        </h2>
        <div
          class="border border-zinc-300 flex-1 relative of-y-auto dark:border-zinc-600"
        >
          <HighlightEditor
            v-model="raw"
            lang="css"
            input-class="min-h-400px"
            class="p-4"
          />
        </div>
      </div>
      <div class="flex flex-col relative lg:w-1/2">
        <h2
          class="text-2xl font-semibold py-4 text-center flex-center flex-none"
        >
          <div class="i-vscode-icons:file-type-css mr-2" />
          <span>Minified</span>
        </h2>
        <div
          class="border border-zinc-300 flex-1 relative of-y-auto dark:border-zinc-600"
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
