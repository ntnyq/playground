<script lang="ts" setup>
import { NuxtLink } from '#components'

defineProps<{
  icon: string
  title?: string
  to?: string
}>()
</script>

<template>
  <component
    v-tooltip="title"
    :is="to ? NuxtLink : 'button'"
    :to
    :title
    :type="to ? undefined : 'button'"
    class="icon-button p-1 rounded-full flex-none aspect-ratio-1 @hover:color-primary @hover:bg-primary/15 dark:@hover:bg-primary/30"
    role="button"
  >
    <slot>
      <span
        :class="icon"
        class="block"
      />
    </slot>
  </component>
</template>
