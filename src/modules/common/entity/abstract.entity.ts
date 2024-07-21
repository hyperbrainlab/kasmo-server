import { ApiProperty } from '@nestjs/swagger';

import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity {
  @ApiProperty({ description: 'Primary Key' })
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({ description: '생성일자' })
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  public createdAt: Date;

  @ApiProperty({ description: '최근 업데이트 일자' })
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updatedAt: Date;
}
