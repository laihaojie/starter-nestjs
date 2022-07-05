import * as requestIp from 'request-ip'
import { keyNames } from 'src/config'

export async function UserMiddleware(request: Request, res: Response, next: () => void) {
  request[keyNames.start_time] = Date.now()
  // @ts-expect-error xxx
  request[keyNames.ip] = requestIp.getClientIp(request)
  next()
}
