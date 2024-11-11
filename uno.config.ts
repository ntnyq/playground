import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      'flex-center': 'flex items-center justify-center',

      'border-base': 'border-gray:20',
    },
    [
      /^btn-simple-(.*)$/,
      ([, color]) => [
        `@hover:border-${color}/50 @hover:color-${color} @hover:opacity-100`,
        `active:bg-${color}/10`,
        'disabled:opacity-50 disabled:cursor-not-allowed disbled:pointer-events-none',
        'border border-base border-rounded-lg',
        'flex gap-1 items-center justify-center',
      ],
    ],
  ],

  theme: {
    colors: {
      primary: '#14b8a6',
    },
  },

  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      autoInstall: true,
      extraProperties: {
        color: 'inherit',
      },
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'bunny',
      timeouts: {
        warning: 7_000,
        failure: 10_000,
      },
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
      processors: createLocalFontProcessor(),
    }),
  ],

  transformers: [transformerDirectives(), transformerVariantGroup()],
})
