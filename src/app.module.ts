import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron/cron.service';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';

@Module({
  imports: [ScheduleModule.forRoot(), CacheModule.register()],
  providers: [CronService],
  controllers: [AppController],
})
export class AppModule {}
