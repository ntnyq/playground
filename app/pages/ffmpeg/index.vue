<script lang="ts" setup>
import { FFmpeg } from '@ffmpeg/ffmpeg'
import workerUrl from '@ffmpeg/ffmpeg/worker?worker&url'
import { fetchFile, toBlobURL } from '@ffmpeg/util'

const baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm'
const videoURL =
  'https://raw.githubusercontent.com/ffmpegwasm/testdata/master/video-15s.avi'

const ffmpeg = new FFmpeg()

const videoSrc = ref('')
const message = ref('Click to Start to Transcode')

async function loadFFmpeg() {
  if (ffmpeg.loaded) {
    return
  }

  ffmpeg.on('log', evt => {
    message.value = evt.message
  })

  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    workerURL: await toBlobURL(
      `${baseURL}/ffmpeg-core.worker.js`,
      'text/javascript',
    ),
    classWorkerURL: new URL(workerUrl, import.meta.url).toString(),
  })
}

async function transcode() {
  message.value = 'Loading ffmpeg-core.js'

  await loadFFmpeg()

  message.value = 'Start to Transcode'

  await ffmpeg.writeFile('test.avi', await fetchFile(videoURL))
  await ffmpeg.exec(['-i', 'test.avi', 'test.mp4'])

  message.value = 'Complete Transcode'

  const data = await ffmpeg.readFile('test.mp4')
  const url = URL.createObjectURL(
    new Blob([(data as { buffer: ArrayBuffer }).buffer], { type: 'video/mp4' }),
  )

  videoSrc.value = url
}
</script>

<template>
  <div class="flex-center h-full relative">
    <div class="">
      <div class="mx-auto h-300px w-500px block">
        <video
          :src="videoSrc"
          class="h-full w-full object-cover"
          controls
        />
      </div>

      <button
        @click="transcode"
        class="text-white mx-auto my-4 p-2 rounded bg-blue-500 block hover:bg-blue-600"
        type="button"
      >
        Transcode
      </button>

      <p class="text-lg p-4 block">{{ message }}</p>
    </div>
  </div>
</template>
