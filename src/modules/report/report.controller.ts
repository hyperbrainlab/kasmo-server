import { ReportService } from './report.service';
import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Param,
  Body,
  InternalServerErrorException,
  ValidationPipe,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';
import { ReportRequest } from './dto/request.report.dto';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '신고하기' })
  @ApiTags('report')
  @ApiResponse({ status: 200 })
  @Post(':reportedUserId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async report(
    @Request() req,
    @Param('reportedUserId', ParseIntPipe) reportedUserId: number,
    @Body() reportRequest: ReportRequest,
  ) {
    try {
      const reporterId = req.user.id;

      return await this.reportService.report({
        reporterUserId: reporterId,
        reportedUserId: reportedUserId,
        ...reportRequest,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
