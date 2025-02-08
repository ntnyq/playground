<script lang="ts" setup>
import { createP5 } from 'p5i'
import type { P5I } from 'p5i'

const {
  mount,
  unmount,
  stroke,
  resizeCanvas,
  sin,
  cos,
  noFill,
  noise,
  noiseSeed,
  background,
  createCanvas,
  TWO_PI,
} = createP5()

const SCALE = 200
const LENGTH = 10
const SPACING = 15

const elRef = useTemplateRef('elRef')
const { width, height } = useElementBounding(elRef)

const offsetY = window.scrollY
const existingPoints = new Set<string>()
const points: { x: number; y: number; opacity: number }[] = []

function getForceOnPoint(x: number, y: number, z: number) {
  // https://p5js.org/reference/#/p5/noise
  return (noise(x / SCALE, y / SCALE, z) - 0.5) * 2 * TWO_PI
}

function randomColor() {
  return `#${Math.random().toString(16).slice(2, 8)}`
}

function addPoints() {
  for (let x = -SPACING / 2; x < width.value + SPACING; x += SPACING) {
    for (let y = -SPACING / 2; y < height.value + offsetY + SPACING; y += SPACING) {
      const id = `${x}-${y}`
      if (existingPoints.has(id)) {
        continue
      }
      existingPoints.add(id)
      points.push({ x, y, opacity: Math.random() * 0.5 + 0.5 })
    }
  }
}

function draw({ circle, background }: P5I) {
  background('#ffffff')
  const t = Date.now() / 10000

  for (const p of points) {
    const { x, y } = p
    const rad = getForceOnPoint(x, y, t)
    const length = (noise(x / SCALE, y / SCALE, t * 2) + 0.5) * LENGTH
    const nx = x + cos(rad) * length
    const ny = y + sin(rad) * length

    stroke(randomColor())
    circle(nx, ny - offsetY, 1)
  }
}

function setup() {
  createCanvas(width.value, height.value)
  background('#ffffff')
  stroke('#cccccc')
  noFill()

  noiseSeed(Date.now())
  addPoints()
}

function restart() {
  if (elRef.value) {
    mount(elRef.value, { setup, draw })
  }
}

onMounted(() => {
  restart()

  useEventListener('resize', () => {
    resizeCanvas(width.value, height.value)
    addPoints()
  })
})

onUnmounted(() => {
  unmount()
})
</script>

<template>
  <div class="relative h-screen flex-center">
    <div class="relative h-300px w-300px">
      <div
        ref="elRef"
        class="pointer-events-none absolute inset-0 -z-1"
      />
    </div>
  </div>
</template>
