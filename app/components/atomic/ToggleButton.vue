<script lang="ts" setup>
const props = defineProps<{
  icon?: string
  color?: string
  title?: string
  to?: string
}>()
const isChecked = defineModel<boolean>('modelValue')
</script>

<template>
  <SimpleButton
    @click="isChecked = !isChecked"
    v-bind="props"
    :class="isChecked ? 'text-primary' : 'op-75 text-#888'"
  >
    <span>{{ title }}</span>
    <span
      v-if="isChecked"
      class="border border-primary rounded-full bg-primary:50 h-2 w-2 absolute -right-0.75 -top-0.75"
    />
  </SimpleButton>
</template>
