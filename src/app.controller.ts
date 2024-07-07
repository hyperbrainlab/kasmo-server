import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'ping' })
  @ApiTags('ping')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
