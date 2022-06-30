import { ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'
import { AuthGuard as A } from '@nestjs/passport'
import { UnAuthorizedException } from '../exceptions/unauthorized'

@Injectable()
export class AuthGuard extends A('jwt') {
  constructor(private reflector: Reflector) { super() }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const auth = this.reflector.get<string[]>('auth', context.getHandler())

    if (auth)
      return super.canActivate(context)
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
