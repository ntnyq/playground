<script lang="ts" setup>
const containterRef = useTemplateRef('containerRef')

useElementSelection(containterRef, {
  target: '.select-target',
  onSelect(el) {
    if (!el) {
      return
    }
    el.classList.add('is-active')
  },
  onClear() {
    if (!containterRef.value) {
      return
    }
    containterRef.value.querySelectorAll('.is-active').forEach(el => {
      el.classList.remove('is-active')
    })
  },
})
</script>

<template>
  <div
    ref="containerRef"
    class="flex-center h-screen select-none"
  >
    <ul class="flex-center flex-wrap gap-15px max-w-600px">
      <li
        v-for="n in 10"
        :key="n"
        class="select-target border-2 border-teal flex-center h-100px w-100px"
      >
        <strong class="text-2xl">{{ n }}</strong>
      </li>
    </ul>
  </div>
</template>

<style>
.select-target.is-active {
  --at-apply: 'bg-teal/20 text-teal!';
}
</style>
