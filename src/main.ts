import { NestFactory } from '@nestjs/core'
import { MyLogger } from './utils/logger'
import { AppModule } from './app.module'
import config from './config'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger(),
  })
  app.enableCors()

  await app.listen(config.server.port)
}
bootstrap()
