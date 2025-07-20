<script lang="ts" setup>
defineProps<{}>()
</script>

<template>
  <SlideContainer>
    <template #left>
      <img
        class="lg:max-w-1200px md:max-w-800px"
        src="/images/rss.png"
        alt="rss"
      />
    </template>
    <template #right>
      <img
        class="lg:max-w-1200px md:max-w-800px"
        src="/images/beauty.png"
        alt="beauty"
      />
    </template>
    <template #footer>
      <p class="p-6 text-center op-50">
        Demo from
        <a
          class="hover:text-primary"
          href="https://rss.beauty/"
          >RSS.Beauty</a
        >
      </p>
    </template>
  </SlideContainer>
</template>
