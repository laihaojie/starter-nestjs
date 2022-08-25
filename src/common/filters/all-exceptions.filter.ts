/* eslint-disable no-console */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, NotFoundException } from '@nestjs/common'
import { E, N } from 'src/utils/response'
import { FileTypeException } from '../exceptions/file_type_error'
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
    let response_data

    const status
      = exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    // 捕获用户未认证错误
    if (exception instanceof UnAuthorizedException) {
      response_data = N()
      collectApiLog(request, response, response_data)
      return response.status(status).json(response_data)
    }

    // 权限不够
    if (exception instanceof NoPermissionException) {
      response_data = E('权限不够')
      collectApiLog(request, response, response_data)
      return response.status(200).json(response_data)
    }

    // 捕获404错误
    if (exception instanceof NotFoundException) {
      response_data = E('Not Found', exception.getResponse())
      collectApiLog(request, response, response_data)
      return response.status(status).json(response_data)
    }

    // 捕获参数错误
    if (exception instanceof ParamErrorException) {
      const exception_response = exception.getResponse()
      response_data = E(exception_response[0], exception_response)
      collectApiLog(request, response, response_data)
      return response.status(status).json(response_data)
    }

    // 文件类型错误
    if (exception instanceof FileTypeException) {
      response_data = E('文件类型错误')
      collectApiLog(request, response, response_data)
      return response.status(200).json(response_data)
    }

    collectExceptionLog(request, response, exception)
    response_data = E('服务器繁忙')
    console.log('exception ', exception)
    return response.status(200).json(response_data)
  }
}
