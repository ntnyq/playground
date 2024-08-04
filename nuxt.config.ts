/**
 * @file Nuxt config
 * @see https://nuxt.com/docs/api/configuration/nuxt-config
 */

import { META } from './constants'

export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', '@unocss/nuxt'],

  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
    },
  },

  app: {
    head: {
      title: META.appName,
      viewport: 'width=device-width,initial-scale=1',
      link: [{ rel: 'icon', type: 'image/png', href: '/icon_48.png' }],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: META.appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  vite: {
    server: {
      cors: true,
    },
  },

  components: {
    dirs: ['~/components'],
  },

  imports: {
    dirs: ['./composables', './utils'],
    addons: {
      vueTemplate: true,
    },
  },

  css: ['@unocss/reset/tailwind.css', '~/styles/vars.css', '~/styles/global.css'],

  ssr: false,

  devtools: { enabled: true },

  compatibilityDate: '2024-08-04',
})
