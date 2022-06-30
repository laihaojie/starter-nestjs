import { Controller, Get, Post, Query, Request } from '@nestjs/common'
import { Auth } from 'src/common/decorators'
import { R } from 'src/utils/response'
import { AccountService } from './account.service'

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Post('login')
  async login() {
    const token = this.accountService.sign_token({ id: 'dfafd', name: '张三' })
    // eslint-disable-next-line no-console
    console.log('token', token)
    return R(token)
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
