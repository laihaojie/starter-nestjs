import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import config from 'config'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    {
      ...JwtModule.register({
        secret: config.jwt.secret,
        signOptions: { expiresIn: config.jwt.expire },
      }),
      global: true,
    },
  ],
  providers: [JwtStrategy],
})
export class MyJwtModule { }
