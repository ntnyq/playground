<template>
  <Suspense>
    <main class="relative flex flex-col lg:h-screen">
      <NuxtPage />
      <DarkToggle class="absolute right-4 top-4 z-99999" />
    </main>

    <template #fallback>
      <div class="h-screen flex-center flex-col gap-4 text-4xl font-medium">
        <div class="i-ri:loader-4-fill animate-spin" />
        <span>Loading...</span>
      </div>
    </template>
  </Suspense>
</template>
