import { ExecutionContext, Injectable } from '@nestjs/common'
// import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'
import { AuthGuard as A } from '@nestjs/passport'
import { KeyFlags } from 'config'
import { AuthGuardType } from '../decorators'
import { NoPermissionException } from '../exceptions/no_permission_error'
import { UnAuthorizedException } from '../exceptions/unauthorized'

@Injectable()
export class AuthGuard extends A('jwt') {
  constructor(private reflector: Reflector) { super() }

  async canActivate(context: ExecutionContext) {
    const auth = this.reflector.get<AuthGuardType>(KeyFlags.auth, context.getHandler())

    const request = context.switchToHttp().getRequest()
    if (auth) {
      await super.canActivate(context)
      const { role } = request.user
      if (auth.length && !(role & auth[0])) throw new NoPermissionException()
    }
    return true
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  handleRequest(err, user, info) {
    // 可以抛出一个基于info或者err参数的异常
    if (err || !user)
      throw err || new UnAuthorizedException()

    return user
  }
}
