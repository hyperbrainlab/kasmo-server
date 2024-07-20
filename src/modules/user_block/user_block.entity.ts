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

import { UserEntity } from '../user/user.entity';

import { Status } from './constants';

@Entity('user_block')
export class UserBlockEntity extends BaseEntity {
  @ApiProperty({ description: 'User Block Primary Key' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    enum: Status,
  })
  @Column()
  status: string;

  @ApiProperty({ description: '블록을 한 사람' })
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'blocker_id' })
  blocker: UserEntity;

  @ApiProperty({ description: '블록을 당한 사람' })
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'blocked_id' })
  blocked: UserEntity;

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
}
