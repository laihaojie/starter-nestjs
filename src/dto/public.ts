import { IsSemVer, IsString } from 'class-validator'

export class CreateSaveAppVersionDto {
  @IsString()
  env: string

  @IsString()
  id: string

  @IsString()
  version: string
}

export class CreateCheckAppVersionDto {
  @IsString()
  @IsSemVer()
  version: string

  // @IsString()
  // platform: string

  @IsString()
  env: string
}
