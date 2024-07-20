import { ApiProperty } from '@nestjs/swagger';

import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Categories } from './constants';

import { CommentEntity } from '../comment/comment.entity';
import { UserEntity } from '../user/user.entity';

@Entity('post')
export class PostEntity extends BaseEntity {
  @ApiProperty({ description: 'Post Primary Key' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '카테고리' })
  @Column({
    enum: Categories,
  })
  category: string;

  @ApiProperty({ description: '제목' })
  @Column()
  title: string;

  @ApiProperty({ description: '본문' })
  @Column()
  body: string;

  @ApiProperty({ description: '조회수' })
  @Column()
  view_count: number;

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
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];
}
