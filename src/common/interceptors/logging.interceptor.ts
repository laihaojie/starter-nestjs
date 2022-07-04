/* eslint-disable no-console */
import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...')
    const request = ctx.switchToHttp().getRequest()
    const logger = new Logger()

    return next
      .handle()
      .pipe(
        tap((val) => {
          logger.verbose('extract logs', request, val)
        }),
      )
  }
}
