/* eslint-disable unused-imports/no-unused-vars */
import { KeyFlags } from 'config'

export const collectApiLog = (request: Request, response: Response, result: any) => {
  // eslint-disable-next-line no-useless-return
  if (request[KeyFlags.ignore_log]) return

  // TODO : 收集api日志
}

export const collectExceptionLog = (request: Request, response: Response, result: any) => {
  // TODO : 收集api日志
}

export const collectDebugLog = (request: Request, response: Response, result: any) => {
  // t_log.create({
  //   id: randomStr(45),
  //   type: LoggerFlags.debug,
  //   log: JSON.stringify({
  //     time: Date.now() - request[KeyFlags.start_time],
  //     request: {
  //       method: request.method,
  //       url: request.url,
  //       headers: request.headers,
  //       body: request.body,
  //       ip: request[KeyFlags.ip],
  //     },
  //     result,
  //   }),
  // })
}
