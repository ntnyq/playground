import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [],

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
