import { HttpException } from '@nestjs/common'

export class FileTypeException extends HttpException {
  constructor(message = 'FileTypeException') {
    super(message, 200)
  }
}
