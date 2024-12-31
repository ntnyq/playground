<script lang="ts" setup>
import { AutoModel, AutoProcessor, env, RawImage } from '@huggingface/transformers'
import type { CSSProperties } from 'vue'

const logger = createLogger('transformer:remove-bg')

const BG_GRID = `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAGUExURb+/v////5nD/3QAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAUSURBVBjTYwABQSCglEENMxgYGAAynwRB8BEAgQAAAABJRU5ErkJggg==")`

env.allowLocalModels = false

if (env.backends.onnx.wasm) {
  env.backends.onnx.wasm.proxy = true
}

const {
  open: openFileDialog,
  reset: resetSelectedFiles,
  onChange: handleFileDialogChange,
} = useFileDialog({
  multiple: false,
  accept: '.png,.jpg,.jpeg',
})

const dropZoneRef = useTemplateRef('dropZoneRef')
const imageDataURL = shallowRef('')

const imageContainerRef = useTemplateRef('imageContainerRef')
const imageContainerStyle = shallowRef<CSSProperties>({})

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop(files, event) {
    event.preventDefault()
    if (!files?.length) return
    tryLoadFile(files[0])
  },
  dataTypes: ['image/png', 'image/jpeg', 'image/jpg'],
})

handleFileDialogChange(files => {
  if (!files?.length) return
  tryLoadFile(files[0])
})

function tryLoadFile(file?: File) {
  if (!file) return

  const reader = new FileReader()

  reader.addEventListener('load', (event: ProgressEvent<FileReader>) => {
    const content = event.target?.result ?? ''
    if (typeof content !== 'string') return
    imageDataURL.value = content

    predict()

    resetSelectedFiles()
  })

  reader.readAsDataURL(file)
}

// cSpell: disable-next-line
const model = await AutoModel.from_pretrained('briaai/RMBG-1.4', {
  // Do not require config.json to be present in the repository
  config: {
    model_type: 'custom',
    is_encoder_decoder: false,
    max_position_embeddings: 1024,
    'transformers.js_config': {},
    normalized_config: {},
  },
})
// cSpell: disable-next-line
const processor = await AutoProcessor.from_pretrained('briaai/RMBG-1.4', {
  // Do not require config.json to be present in the repository
  config: {
    do_normalize: true,
    do_pad: false,
    do_rescale: true,
    do_resize: true,
    image_mean: [0.5, 0.5, 0.5],
    feature_extractor_type: 'ImageFeatureExtractor',
    image_std: [1, 1, 1],
    resample: 2,
    rescale_factor: 0.00392156862745098,
    size: { width: 1024, height: 1024 },
  },
})

async function predict() {
  const image = await RawImage.fromURL(imageDataURL.value)

  const ar = image.width / image.height
  const [cw, ch] = ar > 720 / 480 ? [720, 720 / ar] : [480 * ar, 480]

  imageContainerStyle.value = {
    width: `${cw}px`,
    height: `${ch}px`,
  }

  // Preprocess image
  const { pixel_values: pixelValues } = await processor(image)

  // Predict alpha matte
  const { output } = await model({ input: pixelValues })

  // Resize mask back to original size
  const mask = await RawImage.fromTensor(output[0].mul(255).to('uint8')).resize(
    image.width,
    image.height,
  )

  // Create new canvas
  const canvas = document.createElement('canvas')

  canvas.width = image.width
  canvas.height = image.height

  const ctx = canvas.getContext('2d')!

  // Draw original image output to canvas
  ctx.drawImage(image.toCanvas(), 0, 0)

  const scale = Math.min(cw / image.width, ch / image.height)

  canvas.style.transform = `scale(${scale})`

  // Update alpha channel
  const pixelData = ctx.getImageData(0, 0, image.width, image.height)

  for (let i = 0; i < mask.data.length; ++i) {
    // @ts-expect-error
    pixelData.data[4 * i + 3] = mask.data[i]
  }
  ctx.putImageData(pixelData, 0, 0)

  // Update UI
  imageContainerRef.value?.append(canvas)
  imageContainerRef.value?.style.removeProperty('background-image')

  if (imageContainerRef.value) {
    imageContainerRef.value.style.background = BG_GRID
  }
}

async function handleClick() {
  try {
    imageDataURL.value = ''
  } catch (err) {
    logger.error(err)
  }
}
</script>

<template>
  <div class="relative h-screen flex-center flex-col gap-4">
    <div
      v-if="imageDataURL"
      ref="imageContainerRef"
      :style="imageContainerStyle"
      class="flex-center"
    />
    <div
      @click="openFileDialog()"
      v-else
      ref="dropZoneRef"
      :class="{
        'bg-green-100 dark:bg-green-600': isOverDropZone,
        'bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-700': !isOverDropZone,
      }"
      class="h-[180px] w-[400px] cursor-pointer rounded-md transition-colors duration-200 ease-in-out"
      role="button"
    >
      <div
        class="h-full flex flex-col items-center justify-center gap-4 text-zinc-600 dark:text-zinc-200"
      >
        <div class="i-carbon:upload h-12 w-12" />
        <p class="text-lg">Select or drop an image file here</p>
      </div>
    </div>

    <SimpleButton
      @click="handleClick"
      title="Reset"
    />
  </div>
</template>
