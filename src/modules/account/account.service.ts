import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AccountService {
  constructor(private readonly jwtService: JwtService) { }

  sign_token(payload: any): string {
    return this.jwtService.sign(payload)
  }
}
