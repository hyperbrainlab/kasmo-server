import { ReportEntity } from './report.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from '../user/user.service';
import { ReportType, Status } from './constants';

@Injectable()
export class ReportService {
  constructor(
    private userService: UserService,
    @InjectRepository(ReportEntity)
    private readonly reportRepository: Repository<ReportEntity>,
  ) {}

  async report({
    reporter_id,
    reported_id,
    report_type,
  }: {
    reporter_id: number;
    reported_id: number;
    report_type: ReportType;
  }) {
    const reporter = await this.userService.findOneById(reporter_id);
    const reported = await this.userService.findOneById(reported_id);

    if (!reporter) {
      throw new NotFoundException('Reporter user not found');
    }

    if (!reported) {
      throw new NotFoundException('Reported user not found');
    }

    return await this.reportRepository.save({
      reporter,
      reported,
      report_type,
      status: Status.APPROVED, // 신고 처리 절차를 생략하고 바로 승인 상태로 처리
    });
  }
}
