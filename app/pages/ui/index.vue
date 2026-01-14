<template>
  <div class="h-screen relative">
    <div class="mx-auto p-4 max-w-720px relative">
      <h1 class="text-4xl font-bold p-4 text-center">UI Components</h1>

      <div class="p-4 relative">
        <SimpleButton icon="i-ri:user-line">SimpleButton</SimpleButton>
      </div>

      <div class="p-4 relative">
        <IconButton
          icon="i-ri:sun-line"
          title="hello world"
        />
      </div>

      <div class="p-4 relative">
        <ToggleButton title="ToggleButton" />
      </div>

      <div class="p-4 relative">
        <IconToggle
          icon="i-ri:moon-line"
          title="ToggleButton"
        />
      </div>

      <div class="p-4 relative">
        <DarkToggle />
      </div>
    </div>
  </div>
</template>
