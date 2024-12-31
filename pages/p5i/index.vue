<script lang="ts" setup>
const list = [
  {
    name: 'Start',
    url: '/p5i/1',
  },
]
</script>

<template>
  <div class="relative p-8">
    <div class="mx-auto max-w-4xl w-full">
      <h1 class="mb-4 p-4 text-center text-3xl font-bold">p5.js Interactive</h1>
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div
          v-for="(item, idx) in list"
          :key="item.url"
          class="flex flex-col gap-2"
        >
          <li class="flex flex-center gap-2 text-xl font-semibold">
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
