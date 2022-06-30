import { NestFactory, Reflector } from '@nestjs/core'
import { MyLogger } from './utils/logger'
import { AppModule } from './app.module'
import config from './config'
import { UserMiddleware } from './common/middlewares/user.middleware'
import { AuthGuard } from './common/guards/auth.guard'
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger(),
  })
  app.use(UserMiddleware)
  app.useGlobalFilters(new AllExceptionsFilter())
  app.useGlobalGuards(new AuthGuard(new Reflector()))
  app.enableCors()
  app.setGlobalPrefix('api')

  await app.listen(config.server.port)
}
bootstrap()
