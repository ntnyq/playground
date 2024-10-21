<script lang="ts" setup>
definePageMeta({
  middleware: to => {
    if (to.path !== to.path.toLowerCase()) {
      return to.path.toLowerCase()
    }
  },
})

const route = useRoute('auth-github-username')
const username = route.params.username

const ghUser = useCookie('github-user')
</script>

<template>
  <div class="h-screen flex-center">
    <div class="flex gap-4 text-center text-2xl text-zinc-200">
      <p>{{ username }}</p>
      <p>{{ ghUser }}</p>
    </div>
  </div>
</template>
