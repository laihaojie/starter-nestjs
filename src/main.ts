import { NestFactory, Reflector } from '@nestjs/core'
import * as requestIp from 'request-ip'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import config from './config'
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter'
import { AuthGuard } from './common/guards/auth.guard'
import { UserMiddleware } from './common/middlewares/user.middleware'
import { ParamErrorException } from './common/exceptions/param_error'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'
import { MyLogger } from './common/logger'
import { LoggerGuard } from './common/guards/logger.guard'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger(),
  })

  // 设置全局中间件
  app.use(UserMiddleware)

  // 设置解析IP地址
  app.use(requestIp.mw())

  // 开启参数验证
  app.useGlobalPipes(new ValidationPipe({
    // 是否剔除dto未包含的参数
    whitelist: true,
    // 是否出现dto未包含的参数时抛出异常直接返回错误
    // forbidNonWhitelisted: true,
    // 自定义错误状态码
    // errorHttpStatusCode: 200,
    exceptionFactory: errors => new ParamErrorException(errors),
  }))

  // 设置全局异常处理
  app.useGlobalFilters(new AllExceptionsFilter())

  // 设置全局守卫
  app.useGlobalGuards(new AuthGuard(new Reflector()))
  app.useGlobalGuards(new LoggerGuard(new Reflector()))

  // 设置全局拦截器
  app.useGlobalInterceptors(new LoggingInterceptor())

  // 开启跨域
  app.enableCors()

  // 设置路由前缀
  app.setGlobalPrefix('api')

  // 启动应用
  await app.listen(config.server.port)
}
bootstrap()
