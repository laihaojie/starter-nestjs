import { NestFactory } from '@nestjs/core'
import { MyLogger } from './utils/logger'
import { AppModule } from './app.module'
import config from './config'
import { AllExceptionsFilter } from './filters/all-exceptions.filter'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger(),
  })
  app.useGlobalFilters(new AllExceptionsFilter())
  app.enableCors()

  await app.listen(config.server.port)
}
bootstrap()
