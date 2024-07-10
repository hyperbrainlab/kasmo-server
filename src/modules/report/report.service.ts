import { ReportEntity } from './report.entity';
import { Injectable } from '@nestjs/common';

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
    return await this.reportRepository.save({
      reporter_id: reporterId,
      reportee_id: reporteeId,
      report_type,
      status: 'APPROVED', // 신고 처리 절차를 생략하고 바로 승인 상태로 처리
    });
  }
}
