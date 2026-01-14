<script lang="ts" setup>
const list = [
  {
    name: 'Start',
    url: '/p5i/1',
  },
]
</script>

<template>
  <div class="p-8 relative">
    <div class="mx-auto max-w-4xl w-full">
      <h1 class="text-3xl font-bold mb-4 p-4 text-center">p5.js Interactive</h1>
      <div class="gap-4 grid grid-cols-2 md:grid-cols-4">
        <div
          v-for="(item, idx) in list"
          :key="item.url"
          class="flex flex-col gap-2"
        >
          <li class="text-xl font-semibold flex flex-center gap-2">
            <span class="op-70">#{{ idx + 1 }}</span>
            <a
              :href="item.url"
              class="underline-offset-2 hover:underline hover:underline-blue"
            >
              {{ item.name }}
            </a>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>
