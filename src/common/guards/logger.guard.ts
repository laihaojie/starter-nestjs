import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'
import { keyNames } from 'src/config'

@Injectable()
export class LoggerGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ignore = this.reflector.get<string[]>(keyNames.ignore_log, context.getHandler())

    const request = context.switchToHttp().getRequest()
    if (ignore)
      request[keyNames.ignore_log] = true

    return true
  }
}
