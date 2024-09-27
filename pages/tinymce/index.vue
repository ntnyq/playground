<script lang="ts" setup>
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/tinymce'
import type { RawEditorOptions } from 'tinymce'

const options = shallowRef<RawEditorOptions>({
  base_url: '/static/tinymce',
  promotion: false,
  branding: false,
  width: '100%',
  paste_as_text: true,
})
</script>

<template>
  <div class="relative h-screen flex-center">
    <div class="w-full lg:w-1200px md:w-800px">
      <Editor :init="options" />
    </div>
  </div>
</template>
