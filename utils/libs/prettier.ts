import pluginEstree from 'prettier/plugins/estree'
import pluginTypeScript from 'prettier/plugins/typescript'
import { format } from 'prettier/standalone'
import type { Options } from 'prettier'

const options: Options = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  bracketSpacing: true,
  bracketSameLine: false,
  jsxSingleQuote: false,
  singleAttributePerLine: false,
  vueIndentScriptAndStyle: false,
  quoteProps: 'as-needed',
  trailingComma: 'all',
  arrowParens: 'always',
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',
  endOfLine: 'auto',
  embeddedLanguageFormatting: 'auto',
  experimentalTernaries: false,
  plugins: [pluginEstree, pluginTypeScript],
  parser: 'typescript',
}

export async function formatViaPrettier(source: string) {
  return await format(source, options)
}
