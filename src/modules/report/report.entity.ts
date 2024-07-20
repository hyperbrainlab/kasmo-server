import { ApiProperty } from '@nestjs/swagger';

import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ReportType, Status } from './constants';

import { UserEntity } from '../user/user.entity';
import { AbstractEntity } from '../common/entity/abstract.entity';

@Entity('report')
export class ReportEntity extends AbstractEntity {
  @ApiProperty({
    enum: ReportType,
  })
  @Column({
    type: 'enum',
    enum: ReportType,
  })
  report_type: ReportType;

  @ApiProperty({ description: '신고를 한 사람' })
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'reporter_id' })
  reporter: UserEntity;

  @ApiProperty({ description: '신고를 당한 사람' })
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'reported_id' })
  reported: UserEntity;

  @ApiProperty({
    enum: Status,
  })
  @Column({
    type: 'enum',
    enum: Status,
  })
  status: Status;
}
