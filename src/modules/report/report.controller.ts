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
import { ReportRequestDto } from './dto/report.request.dto';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '신고하기' })
  @ApiTags('report')
  @ApiResponse({ status: 200 })
  @Post(':reportee_id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async report(
    @Request() req,
    @Param('reportee_id') reporteeId: number,
    @Body() reportRequestDto: ReportRequestDto,
  ) {
    try {
      const reporterId = req.user.id;

      return await this.reportService.report({
        reporterId,
        reporteeId,
        ...reportRequestDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}