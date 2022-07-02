import { ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common'

import * as requestIp from 'request-ip'

export const IpAddress = createParamDecorator((data, req) => {
  if (req.clientIp)
    return req.clientIp
  return requestIp.getClientIp(req) // In case we forgot to include requestIp.mw() in main.ts
})

export const Auth = (...args: string[]) => SetMetadata('auth', args)

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.user
})
