import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common'
import { Auth } from 'src/common/decorators'
import { CreateLoginDto, CreateQueryDto } from 'src/dto'
import { AccountService } from './account.service'

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Get()
  async get(@Query() query: CreateQueryDto) {
    return query
  }

  @Post('login')
  async login(@Body() body: CreateLoginDto) {
    return this.accountService.login(body, 1)
  }

  @Get('/info')
  @Auth()
  async info(@Request() request) {
    return request.user
  }

  @Get('/user')
  // @UsePipes(new UserPipe())
  // @UseGuards(new AuthGuard())
  @Auth()
  async list(@Query() query, @Request() re) {
    // eslint-disable-next-line no-console
    console.log('re', re.user)
    // throw new Error('error')
    return re.user
  }
}
