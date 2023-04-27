import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import config from 'config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      ignoreExpiration: false,
      secretOrKey: config.jwt.secret,
    })
  }

  async validate(payload: JwtPayloadModel): Promise<JwtPayloadModel> {
    return { id: payload.id, role: payload.role }
  }
}
