import { ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common'

import * as requestIp from 'request-ip'
import { RoleFlags, keyNames } from 'src/config'

export const IpAddress = createParamDecorator((data, req) => {
  if (req.clientIp)
    return req.clientIp
  return requestIp.getClientIp(req) // In case we forgot to include requestIp.mw() in main.ts
})

export type AuthGuardType = [RoleFlags] | []

export const Auth = (...args: AuthGuardType) => SetMetadata(keyNames.auth, args)

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.user
})

export const IgnoreLog = () => SetMetadata(keyNames.ignore_log, true)
