import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TasksModule } from './common/tasks/tasks.module'
import { AccountModule } from './modules/account/account.module'
import { PublicModule } from './modules/public/public.module'

@Module({
  imports: [
    TasksModule,
    AccountModule,
    PublicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
