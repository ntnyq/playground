<script lang="ts" setup>
import { interopDefault } from '@ntnyq/utils'
import typescriptSample from '@/constants/samples/typescript.sample?raw'
import { formatViaPrettier } from '~/utils/libs/prettier'

type Transformer = 'ts-blank-space' | 'oxidase'

const isError = ref(false)
const transformer = useLocalStorage<Transformer>(
  'transformer',
  'ts-blank-space',
)

const typescriptCode = ref(typescriptSample)
const javascriptCode = ref('')

async function removeTypes() {
  let result = ''

  if (transformer.value === 'oxidase') {
    try {
      const { transpile } = await interopDefault(import('oxidase'))

      result = transpile(typescriptCode.value)
      isError.value = false
    } catch (err) {
      console.log(err)
      isError.value = true
    }
  } else if (transformer.value === 'ts-blank-space') {
    try {
      const tsBlankSpace = await interopDefault(import('ts-blank-space'))

      result = tsBlankSpace(typescriptCode.value, err => {
        console.log(err)
        isError.value = true
      })
      isError.value = false
    } catch (err) {
      console.log(err)
      isError.value = true
    }
  }
  javascriptCode.value = await formatViaPrettier(result)
}

watch(
  [typescriptCode, transformer],
  () => {
    removeTypes()
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div class="h-screen relative">
    <div class="mx-auto gap-2 h-full relative lg:(px-20 flex gap-4)">
      <div class="flex flex-col relative lg:w-1/2">
        <h2
          class="text-2xl font-semibold py-4 text-center flex-center flex-none"
        >
          <div class="i-vscode-icons:file-type-typescript-official mr-2" />
          <span>TypeScript</span>
        </h2>
        <div
          class="border border-zinc-300 flex-1 relative of-y-auto dark:border-zinc-600"
        >
          <HighlightEditor
            v-model="typescriptCode"
            input-class="min-h-400px"
            class="p-4"
          />
        </div>
      </div>
      <div class="flex flex-col relative lg:w-1/2">
        <h2
          class="text-2xl font-semibold py-4 text-center flex-center flex-none"
        >
          <div class="i-vscode-icons:file-type-js-official mr-2" />
          <span>JavaScript</span>
        </h2>
        <div
          class="border border-zinc-300 flex-1 relative of-y-auto dark:border-zinc-600"
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

    <div
      class="flex gap-4 items-center left-1/2 top-4 fixed z-1000 -translate-x-1/2"
    >
      <label
        class="font-medium op-65"
        for="transformer"
      >
        Transformer
      </label>
      <select
        v-model="transformer"
        id="transformer"
        class="px-2 py-1 border border-zinc-200"
      >
        <option value="ts-blank-space">ts-blank-space</option>
        <option value="oxidase">oxidase</option>
        <!-- <option value="@swc/wasm-typescript">@swc/wasm-typescript</option> -->
      </select>
    </div>
  </div>
</template>
