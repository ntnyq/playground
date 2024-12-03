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
  presets: [
    presetUno(),
    presetIcons({
      autoInstall: true,
      extraProperties: {
        color: 'inherit',
      },
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        mono: 'DM Mono',
        sans: 'DM Sans',
        serif: 'DM Serif Display',
      },
      processors: createLocalFontProcessor(),
      provider: 'bunny',
      timeouts: {
        failure: 10_000,
        warning: 7_000,
      },
    }),
  ],

  shortcuts: [
    {
      'bg-base': 'bg-white dark:bg-black',

      'bg-hover': 'bg-[#8881]',
      'border-base': 'border-gray:20',
      'box-input': 'box-input-shell box-input-inner focus:(border-primary ring-2 ring-primary:20)',
      'box-input-inner': 'px-2 py-1 outline-none w-full bg-base rounded-lg placeholder-gray:50',

      'box-input-shell':
        'bg-base border-base color-base border rounded-lg focus-within:(border-primary ring-2 ring-primary:20) disabled:(bg-gray:10 color-gray:50)',
      'color-base': 'text-#222 dark:text-#ddd',
      'flex-center': 'flex items-center justify-center',
    },
    [
      /^btn-simple-(.*)$/,
      ([, color]) => [
        `@hover:border-${color}/50 @hover:color-${color} @hover:opacity-100`,
        `active:bg-${color}/10`,
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
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

  transformers: [transformerDirectives(), transformerVariantGroup()],
})
