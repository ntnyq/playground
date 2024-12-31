<script lang="ts" setup>
const [showSVG, toggleShowSVG] = useToggle(true)
</script>

<template>
  <div class="relative h-screen flex-center flex-col gap-4">
    <Transition
      enter-active-class="animate-bounce-in"
      leave-active-class="animate-bounce-out"
      mode="out-in"
    >
      <div
        v-if="showSVG"
        class="h-800px w-800px"
      >
        <svg
          width="800"
          height="800"
          viewBox="0 0 800 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0"
            y="0"
            width="800"
            height="800"
            fill="black"
          />
          <text
            x="50%"
            y="50%"
            dominant-baseline="middle"
            text-anchor="middle"
            fill="#4ade80"
            font-size="160"
            font-weight="600"
          >
            ntnyq
          </text>
        </svg>
      </div>
      <div
        v-else
        class="h-800px w-800px flex-center bg-black"
      >
        <div class="flex-center text-160px text-green font-semibold">
          <span>&lt;</span>
          <p>ntnyq</p>
          <span>&gt;</span>
        </div>
      </div>
    </Transition>

    <SimpleButton
      @click="toggleShowSVG(!showSVG)"
      title="Show SVG"
    />
  </div>
</template>
