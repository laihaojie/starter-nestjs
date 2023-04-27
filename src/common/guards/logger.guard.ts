import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { KeyFlags } from 'config'

@Injectable()
export class LoggerGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ignore = this.reflector.get<string[]>(KeyFlags.ignore_log, context.getHandler())

    const request = context.switchToHttp().getRequest()
    if (ignore)
      request[KeyFlags.ignore_log] = true

    return true
  }
}
