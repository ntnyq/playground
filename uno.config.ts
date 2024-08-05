import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
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
      extraProperties: {
        color: 'inherit',
      },
    }),
    presetTypography(),
  ],

  transformers: [transformerDirectives(), transformerVariantGroup()],
})
