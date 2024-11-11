<script lang="ts" setup></script>

<template>
  <div class="relative h-screen">
    <div class="relative mx-auto max-w-720px p-4">
      <h1 class="p-4 text-center text-4xl font-bold">UI Components</h1>

      <div class="relative p-4">
        <SimpleButton icon="i-ri:user-line">SimpleButton</SimpleButton>
      </div>

      <div class="relative p-4">
        <IconButton
          icon="i-ri:sun-line"
          title="hello world"
        />
      </div>

      <div class="relative p-4">
        <ToggleButton title="ToggleButton" />
      </div>

      <div class="relative p-4">
        <IconToggle
          icon="i-ri:moon-line"
          title="ToggleButton"
        />
      </div>

      <div class="relative p-4">
        <DarkToggle />
      </div>
    </div>
  </div>
</template>
