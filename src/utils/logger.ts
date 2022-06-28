/* eslint-disable no-console */
import { ConsoleLogger } from '@nestjs/common'
import config from '../config'

export class MyLogger extends ConsoleLogger {
  log(message: string): void {
    if (message.includes('route')) {
      const str = message.match(/(?<={).+(?=})/)?.[0]
      const [path, method] = str.split(', ')
      const log = `http://localhost:${config.server.port}${path}`
      console.log('\x1B[32m', method.padEnd(4, ' '), '\x1B[34m', log)
      // super.log(log);
    }
  }
}

