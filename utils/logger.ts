import { consola } from 'consola'
import { META } from '~/constants'

export const logger = consola.withTag(META.appName)

export const createLogger = (scope: string, { prefix = true } = {}) =>
  consola.withTag(prefix ? `${META.appName}:${scope}` : scope)
