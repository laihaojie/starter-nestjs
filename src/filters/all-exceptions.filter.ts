import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { E } from 'src/utils/response'

@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    const status
      = exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    response.status(status).json(E())
  }
}
