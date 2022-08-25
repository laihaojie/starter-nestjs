import { HttpException } from '@nestjs/common'

export class NoPermissionException extends HttpException {
  constructor(message = 'NoPermission') {
    super(message, 200)
  }
}
