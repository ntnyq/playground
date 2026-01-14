<template>
  <Suspense>
    <main class="flex flex-col relative lg:h-screen">
      <NuxtPage />
      <DarkToggle class="right-4 top-4 absolute z-99999" />
    </main>

    <template #fallback>
      <div class="text-4xl font-medium flex-center flex-col gap-4 h-screen">
        <div class="i-ri:loader-4-fill animate-spin" />
        <span>Loading...</span>
      </div>
    </template>
  </Suspense>
</template>
