import { ExecutionContext, Injectable } from '@nestjs/common'
// import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'
import { AuthGuard as A } from '@nestjs/passport'
import { keyNames } from 'src/config'
import { UnAuthorizedException } from '../exceptions/unauthorized'

@Injectable()
export class AuthGuard extends A('jwt') {
  constructor(private reflector: Reflector) { super() }

  async canActivate(context: ExecutionContext) {
    const auth = this.reflector.get<string[]>(keyNames.auth, context.getHandler())

    const request = context.switchToHttp().getRequest()
    if (auth) {
      await super.canActivate(context)
      const { role } = request.user
      if (auth.includes('admin'))
        return auth.includes(role)
    }
    return true
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRequest(err, user, info) {
    // 可以抛出一个基于info或者err参数的异常
    if (err || !user)
      throw err || new UnAuthorizedException()

    return user
  }
}
