// @ts-check

import { defineESLintConfig } from '@ntnyq/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

const configs = await defineESLintConfig({
  svgo: true,
})

export default withNuxt(configs)
