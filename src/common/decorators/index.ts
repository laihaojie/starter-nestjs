import { ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common'

import * as requestIp from 'request-ip'
import { KeyFlags, RoleFlags } from 'src/config'

export const IpAddress = createParamDecorator((data, req) => {
  if (req.clientIp)
    return req.clientIp
  return requestIp.getClientIp(req) // In case we forgot to include requestIp.mw() in main.ts
})

export type AuthGuardType = [RoleFlags] | []

export const Auth = (...args: AuthGuardType) => SetMetadata(KeyFlags.auth, args)

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.user
})

export const IgnoreLog = () => SetMetadata(KeyFlags.ignore_log, true)
