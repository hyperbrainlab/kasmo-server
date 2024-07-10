import { ReportEntity } from './report.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from '../user/user.service';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ReportEntity)
    private readonly reportRepository: Repository<ReportEntity>,
    private userService: UserService,
  ) {}

  async report({
    reporterId,
    reporteeId,
    report_type,
  }: {
    reporterId: number;
    reporteeId: number;
    report_type: string;
  }) {
    const reporter = await this.userService.findOne(reporterId);
    const reportee = await this.userService.findOne(reporteeId);

    if (!reporter) {
      throw new HttpException('Reporter not found.', HttpStatus.BAD_REQUEST);
    }

    if (!reportee) {
      throw new HttpException('Reportee not found.', HttpStatus.BAD_REQUEST);
    }

    return await this.reportRepository.save({
      reporter_id: reporterId,
      reportee_id: reporteeId,
      report_type,
      status: 'APPROVED', // 신고 처리 절차를 생략하고 바로 승인 상태로 처리
    });
  }
}
