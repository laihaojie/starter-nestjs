/* eslint-disable no-console */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { collectApiLog } from '../logger/collect'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...')
    const request = ctx.switchToHttp().getRequest()
    const response = ctx.switchToHttp().getResponse()

    return next
      .handle()
      .pipe(
        tap((val) => {
          collectApiLog(request, response, val)
        }),
      )
  }
}

