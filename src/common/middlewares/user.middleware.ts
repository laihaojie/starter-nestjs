import * as requestIp from 'request-ip'
import { KeyFlags } from 'config'

export async function UserMiddleware(request: Request, res: Response, next: () => void) {
  request[KeyFlags.start_time] = Date.now()
  // @ts-expect-error xxx
  request[KeyFlags.ip] = requestIp.getClientIp(request)
  next()
}
