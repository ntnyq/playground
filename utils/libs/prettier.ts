import pluginEstree from 'prettier/plugins/estree'
import pluginPostCSS from 'prettier/plugins/postcss'
import pluginTypeScript from 'prettier/plugins/typescript'
import { format } from 'prettier/standalone'
import type { Options } from 'prettier'

// @keep-sorted
const DEFAULT_OPTIONS: Options = {
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'auto',
  experimentalOperatorPosition: 'start',
  experimentalTernaries: false,
  htmlWhitespaceSensitivity: 'css',
  jsxSingleQuote: false,
  objectWrap: 'preserve',
  parser: 'typescript',
  plugins: [pluginEstree, pluginTypeScript, pluginPostCSS],
  printWidth: 80,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  semi: true,
  singleAttributePerLine: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  vueIndentScriptAndStyle: false,
}

export async function formatViaPrettier(source: string, options: Options = {}) {
  return await format(source, {
    ...DEFAULT_OPTIONS,
    ...options,
  })
}
