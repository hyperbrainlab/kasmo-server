import { ApiProperty } from '@nestjs/swagger';

import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ReportType, Status } from './constants';

import { UserEntity } from '../user/user.entity';

@Entity('report')
export class ReportEntity extends BaseEntity {
  @ApiProperty({ description: 'Report Primary Key' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '신고 하는 사람 아이디' })
  @Column()
  reporter_id: number;

  @ApiProperty({ description: '신고 받는 사람 아이디' })
  @Column()
  reported_id: number;

  @ApiProperty({
    enum: ReportType,
  })
  @Column()
  report_type: string;

  @ApiProperty({
    enum: Status,
  })
  @Column()
  status: string;

  @ApiProperty({ description: '생성일자' })
  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Date;

  @ApiProperty({ description: '최근 업데이트 일자' })
  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: Date;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'reporter_id' })
  reporter: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'reported_id' })
  reported: UserEntity;
}
