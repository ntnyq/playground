/**
 * @file Nuxt config
 * @see https://nuxt.com/docs/api/configuration/nuxt-config
 */

import process from 'node:process'
import topLevelAwait from 'vite-plugin-top-level-await'
import wasm from 'vite-plugin-wasm'
import { META } from './app/constants'

const sharedHeaders = {
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
}

export default defineNuxtConfig({
  compatibilityDate: '2025-07-18',

  devtools: { enabled: false },

  ssr: false,

  app: {
    head: {
      link: [{ href: '/icon_48.png', rel: 'icon', type: 'image/png' }],
      title: META.appName,
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { content: 'width=device-width, initial-scale=1', name: 'viewport' },
        { content: META.appDescription, name: 'description' },
        {
          content: 'black-translucent',
          name: 'apple-mobile-web-app-status-bar-style',
        },
      ],
    },
  },

  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
      },
    ],
    transform: {
      include: [/\.vue/, /\.md/],
    },
  },

  css: [
    '@unocss/reset/tailwind.css',
    'floating-vue/dist/style.css',
    '~/styles/vars.css',
    '~/styles/global.css',
  ],

  eslint: {
    config: {
      standalone: false,
    },
  },

  experimental: {
    appManifest: false,
    payloadExtraction: false,
    renderJsonPayloads: true,
    scanPageMeta: true,
    typedPages: true,
  },

  future: {
    compatibilityVersion: 4,
  },

  imports: {
    dirs: ['./composables', './utils'],
    addons: {
      vueTemplate: true,
    },
  },

  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxt/eslint',
    'nuxt-monaco-editor',
  ],

  nitro: {
    preset: 'static',
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    routeRules: {
      '/': {
        prerender: true,
      },
      '/**': {
        headers: sharedHeaders,
        prerender: false,
      },
      '/200.html': {
        prerender: true,
      },
      '/404.html': {
        prerender: true,
      },
    },
  },

  runtimeConfig: {
    url: 'https://playground.ntnyq.com',
    github: {
      // OAuth client
      // cSpell: disable-next-line
      clientId: process.env.GITHUB_OAUTH_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET || '',
      token: '',
    },
  },

  vite: {
    esbuild: {
      legalComments: 'external',
    },

    optimizeDeps: {
      exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util'],
    },

    plugins: [
      // https://github.com/Menci/vite-plugin-wasm
      wasm(),
      topLevelAwait(),
    ],

    resolve: {
      alias: {
        path: 'pathe',
        util: 'util',
      },
    },

    server: {
      cors: true,
      headers: sharedHeaders,
    },
  },
})
