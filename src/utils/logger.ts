/* eslint-disable no-console */
import { ConsoleLogger } from '@nestjs/common'
import config from '../../config'

export class MyLogger extends ConsoleLogger {
  log(message: string): void {
    if (message.includes('route')) {
      const str = message.match(/(?<=\{).+(?=\})/)?.[0]
      const [path, method] = str.split(', ')
      const log = `http://localhost:${config.server.port}${path}`
      console.log('\x1B[32m', method.padEnd(4, ' '), '\x1B[34m', log)
      // super.log(log);
    }
    else {
      super.log(message)
    }
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    console.log(message, optionalParams)
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    console.log(message, optionalParams)
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: any, ...optionalParams: any[]) {
    console.log(message, optionalParams)
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: any, ...optionalParams: any[]) {
    if (message === 'extract logs') {
      console.log(message, optionalParams)
      return
    }
    super.verbose(message, ...optionalParams)
  }
}
