import { ApiProperty } from '@nestjs/swagger';

import { Entity, Column, ManyToOne } from 'typeorm';

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

  @ApiProperty({ description: '블록을 한 사람', type: () => UserEntity })
  @ManyToOne(() => UserEntity)
  blocker: UserEntity;

  @ApiProperty({ description: '블록을 당한 사람', type: () => UserEntity })
  @ManyToOne(() => UserEntity)
  blocked: UserEntity;
}
