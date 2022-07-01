/* eslint-disable no-console */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, NotFoundException } from '@nestjs/common'
import { E, N } from 'src/utils/response'
import { ParamErrorException } from '../exceptions/param_error'
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

    // 捕获用户未认证错误
    if (exception instanceof UnAuthorizedException)
      return response.status(200).json(N())

    // 捕获404错误
    if (exception instanceof NotFoundException)
      return response.status(status).json(E('Not Found', exception.getResponse()))

    // 捕获参数错误
    if (exception instanceof ParamErrorException) {
      const exception_response = exception.getResponse()
      return response.status(200).json(E(exception_response[0], exception_response))
    }

    console.log('exception ', exception)
    return response.status(200).json(E('服务器繁忙', exception))
  }
}
