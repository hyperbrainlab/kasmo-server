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
  @Post(':reported_id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async report(
    @Request() req,
    @Param('reported_id') reported_id: number,
    @Body() reportRequestDto: ReportRequest,
  ) {
    try {
      const reporter_id = req.user.id;

      return await this.reportService.report({
        reporter_id,
        reported_id,
        ...reportRequestDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
