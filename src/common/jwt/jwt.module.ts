// import { Global, Module } from '@nestjs/common'
// import { JwtModule, JwtService } from '@nestjs/jwt'
// import config from 'src/config'
// import { JwtStrategy } from './jwt.strategy'

// @Global()
// @Module({
//   imports: [
//     JwtModule.register({
//       secret: config.jwt.secret,
//       signOptions: { expiresIn: config.jwt.expire },
//     }),
//   ],
//   providers: [JwtService, JwtStrategy],
//   exports: [JwtService],
// })
// export class MyJwtModule { }
