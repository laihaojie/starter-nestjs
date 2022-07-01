import { HttpException, ValidationError } from '@nestjs/common'

export class ParamErrorException extends HttpException {
  constructor(errors: ValidationError[]) {
    const response = errors.reduce((pre, item) => [...pre, ...Object.values(item.constraints)], [])
    super(response, 400)
  }
}
