import { Controller, Get, Query } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get('query')
  async search(@Query('sno') sno: string) {
    return sno;
  }

  @Get('fake')
  async fake(@Query('num') num: number) {
    return num;
  }
}
