/* eslint-disable no-console */
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class UserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('1 ', value)
    console.log('metadata', metadata)
    return value
  }
}
