<script lang="ts" setup>
import { interopDefault } from '@ntnyq/utils'
import typescriptSample from '@/constants/samples/typescript.sample?raw'
import { formatViaPrettier } from '~/utils/libs/prettier'

type Transformer = 'ts-blank-space' | 'oxidase' | '@swc/wasm-typescript'

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
  } else if (transformer.value === '@swc/wasm-typescript') {
    try {
      const { transform } = await interopDefault(import('@swc/wasm-typescript'))
      const { code } = await transform(typescriptCode.value, {
        mode: 'strip-only',
      })
      result = code
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

    <div
      class="fixed left-1/2 top-4 z-1000 flex items-center gap-4 -translate-x-1/2"
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
        class="border border-zinc-200 px-2 py-1"
      >
        <option value="ts-blank-space">ts-blank-space</option>
        <option value="oxidase">oxidase</option>
        <!-- <option value="@swc/wasm-typescript">@swc/wasm-typescript</option> -->
      </select>
    </div>
  </div>
</template>
