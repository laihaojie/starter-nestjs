import { HttpException } from '@nestjs/common'

export class UnAuthorizedException extends HttpException {
  constructor(message = 'UnAuthorized') {
    super(message, 200)
  }
}
