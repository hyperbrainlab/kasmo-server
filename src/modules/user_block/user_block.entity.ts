import { ApiProperty } from '@nestjs/swagger';

import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { UserEntity } from '../user/user.entity';

import { Status } from './constants';
import { AbstractEntity } from '../common/entity/abstract.entity';

@Entity('user_block')
export class UserBlockEntity extends AbstractEntity {
  @ApiProperty({
    enum: Status,
  })
  @Column({
    type: 'enum',
    enum: Status,
  })
  status: Status;

  @ApiProperty({ description: '블록을 한 사람' })
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'blocker_id' })
  blocker: UserEntity;

  @ApiProperty({ description: '블록을 당한 사람' })
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'blocked_id' })
  blocked: UserEntity;
}
