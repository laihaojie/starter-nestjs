import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator'

function isConfirmed(
  field: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isConfirmed',
      target: object.constructor,
      options: validationOptions,
      propertyName,
      validator: {
        validate(value: string, args: ValidationArguments) {
          return value === args.object[field]
        },
        defaultMessage() {
          return '二次密码输入的不正确'
        },
      },
    })
  }
}

export class CreateQueryDto {
  @IsString()
  a: string

  @IsNumber()
  @isConfirmed('c')
  b: number

  @IsNumber()
  c: number

  @IsNotEmpty()
  @Type(() => Number)
  d: number[]
}

export class CreateLoginDto {
  @IsString()
  @IsNotEmpty()
  account: string

  @IsString()
  @IsNotEmpty()
  password: string
}
