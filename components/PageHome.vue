<script lang="ts" setup>
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div class="relative min-h-screen of-y-auto">
    <div class="mx-auto px-4 container">
      <div class="py-8">
        <h1 class="text-3xl font-bold">{{ title }}</h1>
        <p
          v-if="description"
          class="text-gray-500"
        >
          {{ description }}
        </p>
      </div>
    </div>
    <div class="relative">
      <slot />
    </div>
  </div>
</template>
