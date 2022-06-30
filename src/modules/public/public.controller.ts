import { Controller, Get } from '@nestjs/common';

@Controller('public')
export class PublicController {
  constructor() {

  }

  @Get('/user')
  async list() {
    return { a: 1 }
  }
}
