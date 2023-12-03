import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment';
import prisma from 'prisma/db';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  @Cron('* 0,8,16 * * *')
  async handleCron() {
    const result = await prisma.shipping.groupBy({
      by: 'status',
      _count: {
        status: true,
      },
    });
    console.log({
      created_dt: moment().format('YYYY-MM-DDTHH:mm:ss[Z]'),
      trackingSummary: result.reduce((acc, item) => {
        return {
          ...acc,
          [item.status]: item._count.status,
        };
      }, {}),
    });
  }
}
