import { HttpException } from '@nestjs/common'

export class NoPermissionException extends HttpException {
  constructor() {
    super('NoPermission', 200)
  }
}
