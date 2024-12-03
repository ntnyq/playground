/**
 * @file Nuxt config
 * @see https://nuxt.com/docs/api/configuration/nuxt-config
 */

import process from 'node:process'
import { META } from './constants'

export default defineNuxtConfig({
  app: {
    head: {
      link: [{ href: '/icon_48.png', rel: 'icon', type: 'image/png' }],
      meta: [
        { content: 'width=device-width, initial-scale=1', name: 'viewport' },
        { content: META.appDescription, name: 'description' },
        { content: 'black-translucent', name: 'apple-mobile-web-app-status-bar-style' },
      ],
      title: META.appName,
      viewport: 'width=device-width,initial-scale=1',
    },
  },

  compatibilityDate: '2024-10-26',

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

  devtools: { enabled: true },

  eslint: {
    config: {
      standalone: false,
    },
  },

  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
    scanPageMeta: true,
    typedPages: true,
  },

  future: {
    compatibilityVersion: 4,
  },

  imports: {
    addons: {
      vueTemplate: true,
    },
    dirs: ['./composables', './utils'],
  },

  modules: ['@vueuse/nuxt', '@unocss/nuxt', '@nuxt/eslint', 'nuxt-monaco-editor'],

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
    routeRules: {},
  },

  runtimeConfig: {
    github: {
      // Oauth client
      // cSpell: disable-next-line
      clientId: process.env.GITHUB_OAUTH_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET || '',
      token: '',
    },
    url: 'https://playground.ntnyq.com',
  },

  ssr: false,

  vite: {
    esbuild: {
      legalComments: 'external',
    },

    resolve: {
      alias: {
        path: 'pathe',
      },
    },

    server: {
      cors: true,
      headers: {
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
      },
    },
  },
})
