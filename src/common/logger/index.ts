/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
import { ConsoleLogger } from '@nestjs/common'
import { Colors } from 'picocolors/types'
import config from 'src/config'

const os = require('os')
const pc: Colors = require('picocolors')

export class MyLogger extends ConsoleLogger {
  log(message: string, context): void {
    if (context === 'InstanceLoader') return
    if (message.includes('route')) {
      const str = message.match(/(?<={).+(?=})/)?.[0]
      const [path, method] = str.split(', ')
      const log = `http://${getIPAddress()}:${config.server.port}${path}`
      console.log(pc.green(method.padEnd(4, ' ')), pc.blue(log))
    }
    else { super.log(message) }
  }

  verbose(message: any, ...optionalParams: any[]) {
    super.verbose(message, ...optionalParams)
  }
}

function getIPAddress() {
  let ipv4 = ''
  const ifaces = os.networkInterfaces()
  // console.log(ifaces)// 所有类型的适配器和全部内容
  for (const dev in ifaces) {
    ifaces[dev].forEach((details) => {
      if (dev === '以太网') { // 判断需要获取IP的适配器
        if (details.family === 'IPv4') { // 判断是IPV4还是IPV6 还可以通过alias去判断
          ipv4 = details.address// 取addressIP地址
        }
      }
    })
  }
  return ipv4 || '127.0.0.1'
}
