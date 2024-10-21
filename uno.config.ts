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
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
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
