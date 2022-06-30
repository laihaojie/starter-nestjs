import { HttpException } from '@nestjs/common'

export class UnAuthorizedException extends HttpException {
  constructor() {
    super('UnAuthorized', 401)
  }
}
