<script lang="ts" setup>
import * as zrender from 'zrender'

const SIZE = {
  gutter: 20,

  gateWidth: 20,
  gateHeight: 150,
  gateOffset: 100,

  buildingWidth: 200,
  buildingHeight: 160,
}
const Z_INDEX = {
  bg: 1,
}

const containerRef = useTemplateRef('containerRef')

function render() {
  const zr = zrender.init(containerRef.value)
  const w = zr.getWidth() || 0
  const h = zr.getHeight() || 0

  const rect = new zrender.Rect({
    shape: {
      x: SIZE.gutter,
      y: SIZE.gutter,
      width: w - SIZE.gutter * 2,
      height: h - SIZE.gutter * 2,
    },
    style: {
      stroke: '#000',
      lineWidth: 2,
      fill: 'transparent',
    },
    silent: true,
    z: Z_INDEX.bg,
  })

  zr.add(rect)

  const gate1 = new zrender.Rect({
    shape: {
      x: SIZE.gateWidth / 2,
      y: SIZE.gutter + SIZE.gateOffset,
      width: SIZE.gateWidth,
      height: SIZE.gateHeight,
    },
    style: {
      fill: '#000',
    },
    textConfig: {
      position: 'inside',
    },
    textContent: new zrender.Text({
      style: {
        text: `小\n区\n大\n门`,
        fontSize: 16,
        lineHeight: 24,
        fill: '#fff',
      },
      z: 100,
    }),
    z: 10,
    silent: true,
  })
  const gate2 = new zrender.Rect({
    shape: {
      x: w - SIZE.gateWidth / 2 - SIZE.gateWidth,
      y: h - SIZE.gutter - SIZE.gateOffset - SIZE.gateHeight,
      width: SIZE.gateWidth,
      height: SIZE.gateHeight,
    },
    style: {
      fill: '#000',
    },
    textConfig: {
      position: 'inside',
    },
    textContent: new zrender.Text({
      style: {
        text: `小\n区\n大\n门`,
        fontSize: 16,
        lineHeight: 24,
        fill: '#fff',
      },
      z: 100,
    }),
    z: 10,
    silent: true,
  })

  const building1 = new zrender.Rect({
    shape: {
      x: 100,
      y: 200,
      width: SIZE.buildingWidth,
      height: SIZE.buildingHeight,
    },
    style: {
      fill: '#0ff',
    },
    textConfig: {
      position: 'inside',
    },
    textContent: new zrender.Text({
      style: {
        text: '1号楼',
        fontSize: 18,
        lineHeight: 24,
        fill: '#000',
      },
      z: 100,
    }),
  })
  const building2 = new zrender.Rect({
    shape: {
      x: 500,
      y: 200,
      width: SIZE.buildingWidth,
      height: SIZE.buildingHeight,
    },
    style: {
      fill: '#0ff',
    },
    textConfig: {
      position: 'inside',
    },
    textContent: new zrender.Text({
      style: {
        text: '2号楼',
        fontSize: 18,
        lineHeight: 24,
        fill: '#000',
      },
      z: 100,
    }),
  })
  const building3 = new zrender.Rect({
    shape: {
      x: 300,
      y: 500,
      width: SIZE.buildingWidth,
      height: SIZE.buildingHeight,
    },
    style: {
      fill: '#0ff',
    },
    textConfig: {
      position: 'inside',
    },
    textContent: new zrender.Text({
      style: {
        text: '3号楼',
        fontSize: 18,
        lineHeight: 24,
        fill: '#000',
      },
      z: 100,
    }),
  })

  zr.add(gate1)
  zr.add(gate2)

  zr.add(building1)
  zr.add(building2)
  zr.add(building3)
}

tryOnMounted(render)
</script>

<template>
  <div class="h-screen flex-center">
    <div
      ref="containerRef"
      class="h-80vmin w-80vmin"
    />
  </div>
</template>
