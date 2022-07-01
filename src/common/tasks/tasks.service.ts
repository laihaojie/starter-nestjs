import { Injectable, Logger } from '@nestjs/common'
import { Cron, Interval } from '@nestjs/schedule'

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name)

  @Cron('45 * * * * *')
  handleCron() {
    this.logger.log('Cron job executed')
    this.logger.debug('Called when the current second is 45')
  }

  @Interval(1000 * 60)
  handleInterval() {
    this.logger.log('Cron job executed')
    // this.logger.debug('Called when the current second is 1000')
  }
}
