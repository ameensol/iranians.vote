import log from 'loglevel'
import { i18n } from '@/localization'

export class ErrorHandler {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static process(error: Error | unknown, errorMessage = ''): void {
    ErrorHandler.processWithoutFeedback(error)
  }

  static processWithoutFeedback(error: Error | unknown): void {
    log.error(error)
  }

  static _getErrorMessage(error: Error | unknown): string {
    let errorMessage = ''

    if (error instanceof Error)
      switch (error.constructor) {
        default: {
          errorMessage = i18n.global.t('errors.default')
        }
      }

    return errorMessage
  }
}
