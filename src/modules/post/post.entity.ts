import { ApiProperty } from '@nestjs/swagger';

import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { Categories } from './constants';

import { CommentEntity } from '../comment/comment.entity';
import { UserEntity } from '../user/user.entity';
import { AbstractEntity } from '../common/entity/abstract.entity';

@Entity('post')
export class PostEntity extends AbstractEntity {
  @ApiProperty({ description: '카테고리' })
  @Column({
    type: 'enum',
    enum: Categories,
  })
  category: Categories;

  @ApiProperty({ description: '제목' })
  @Column()
  title: string;

  @ApiProperty({ description: '본문' })
  @Column()
  body: string;

  @ApiProperty({ description: '조회수' })
  @Column()
  view_count: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];
}
