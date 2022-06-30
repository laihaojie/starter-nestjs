/* eslint-disable no-console */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, NotFoundException } from '@nestjs/common'
import { E, N } from 'src/utils/response'
import { UnAuthorizedException } from '../exceptions/unauthorized'

@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    const status
      = exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
    if (exception instanceof UnAuthorizedException)
      return response.status(status).json(N())

    if (exception instanceof NotFoundException)
      return response.status(status).json(E('Not Found', exception.getResponse()))

    console.log('exception ', exception)
    return response.status(status).json(E('服务器繁忙', exception))
  }
}
