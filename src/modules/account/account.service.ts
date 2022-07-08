import { randomStr } from '@djie/utils'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CreateLoginDto } from 'src/dto'
import { R } from 'src/utils/response'

@Injectable()
export class AccountService {
  constructor(private readonly jwtService: JwtService) { }

  login(body: CreateLoginDto, role: number) {
    // const { account, password } = body

    const payload: JwtPayloadModel = {
      id: randomStr(45),
      role,
    }
    return R(this.jwtService.sign(payload))
  }
}
