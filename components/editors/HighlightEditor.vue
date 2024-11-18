<script lang="ts" setup>
const props = defineProps<{
  lang?: 'javascript' | 'typescript'
  inputClass?: string
}>()

const modelValue = defineModel<string>('modelValue')

function getSupported() {
  try {
    const el = document.createElement('div')
    el.contentEditable = 'plaintext-only'
    return true
  } catch {
    return false
  }
}

const isSupported = getSupported()
const sharedClass = 'box-input font-mono'

const editorRef = useTemplateRef('editorRef')
const containerRef = useTemplateRef('containerRef')

const { focused } = useFocus(editorRef)

const text = ref('')
const revision = ref(0)
const updatePaused = ref(false)

const { trigger: triggerHighlight } = usePlainShiki(editorRef, {
  enabled: isSupported,
  immediate: false,
  lang: props.lang || 'typescript',
  themes: {
    light: 'github-light',
    dark: 'github-dark',
  },
})

const { stop } = useIntersectionObserver(containerRef, entries => {
  if (entries[0]?.isIntersecting) {
    triggerHighlight()
    stop()
  }
})

async function updateModelValue() {
  updatePaused.value = true
  modelValue.value = editorRef.value?.textContent ?? ''
  await nextTick()
  updatePaused.value = false
}

watch(
  modelValue,
  () => {
    if (updatePaused.value) {
      return
    }
    text.value = modelValue.value || ''
    revision.value += 1
  },
  {
    flush: 'sync',
    immediate: true,
  },
)
</script>

<template>
  <div
    ref="containerRef"
    class="relative flex flex-col gap-1"
  >
    <slot :focused="focused" />
    <div
      @input="updateModelValue"
      v-if="isSupported"
      :key="revision"
      ref="editorRef"
      :class="[inputClass, sharedClass]"
      role="input"
      class="p-2"
      contenteditable="plaintext-only"
    >
      {{ text }}
    </div>
    <textarea
      v-model="modelValue"
      v-else
      ref="editorRef"
      :class="[inputClass, sharedClass]"
    />
  </div>
</template>
