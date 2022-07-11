/* eslint-disable no-console */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, NotFoundException } from '@nestjs/common'
import { E, N } from 'src/utils/response'
import { NoPermissionException } from '../exceptions/no_permission_error'
import { ParamErrorException } from '../exceptions/param_error'
import { UnAuthorizedException } from '../exceptions/unauthorized'
import { collectApiLog, collectExceptionLog } from '../logger/collect'

@Catch()
export class AllExceptionsFilter<T extends Error> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    const status
      = exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    // 捕获用户未认证错误
    if (exception instanceof UnAuthorizedException) {
      collectApiLog(request, response, N())
      return response.status(status).json(N())
    }

    // 权限不够
    if (exception instanceof NoPermissionException) {
      collectApiLog(request, response, E('权限不够'))
      return response.status(200).json(E('权限不够'))
    }

    // 捕获404错误
    if (exception instanceof NotFoundException) {
      const res = E('Not Found', exception.getResponse())
      collectApiLog(request, response, res)
      return response.status(status).json(res)
    }

    // 捕获参数错误
    if (exception instanceof ParamErrorException) {
      const exception_response = exception.getResponse()
      const res = E(exception_response[0], exception_response)
      collectApiLog(request, response, res)
      return response.status(status).json(res)
    }
    collectExceptionLog(request, response, exception)
    console.log('exception ', exception)
    return response.status(200).json(E('服务器繁忙'))
  }
}
