<script lang="ts" setup>
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'

const editor = useEditor({
  content: `<h1>Hello World</h1>`,
  extensions: [StarterKit],
  injectCSS: true,
})
</script>

<template>
  <div class="relative h-screen flex-center">
    <div class="w-full lg:w-1200px md:w-800px">
      <ClientOnly>
        <EditorContent :editor="editor" />
      </ClientOnly>
    </div>
  </div>
</template>
