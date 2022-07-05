import { IsDateString, IsNotEmpty, IsNumberString, IsString } from 'class-validator'

export class CreateQueryDto {
  @IsString()
  @IsNumberString()
  a: string

  @IsDateString()
  @IsNotEmpty()
  b: string
}

export class CreateLoginDto {
  @IsString()
  @IsNotEmpty()
  account: string

  @IsString()
  @IsNotEmpty()
  password: string
}
