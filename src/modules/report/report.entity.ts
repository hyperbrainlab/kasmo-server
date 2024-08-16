import { ApiProperty } from '@nestjs/swagger';

import { Entity, Column, ManyToOne } from 'typeorm';
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
    name: 'report_type',
  })
  reportType: ReportType;

  @ApiProperty({ description: '신고를 한 사람', type: () => UserEntity })
  @ManyToOne(() => UserEntity)
  reporter: UserEntity;

  @ApiProperty({ description: '신고를 당한 사람', type: () => UserEntity })
  @ManyToOne(() => UserEntity)
  reported: UserEntity;

  @ApiProperty({
    enum: Status,
  })
  @Column({
    type: 'enum',
    enum: Status,
    name: 'status',
  })
  status: Status;
}
