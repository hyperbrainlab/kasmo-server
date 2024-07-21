import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { Categories } from './constants';

import { CommentEntity } from '../comment/comment.entity';
import { UserEntity } from '../user/user.entity';
import { AbstractEntity } from '../common/entity/abstract.entity';

@Entity('post')
export class PostEntity extends AbstractEntity {
  @ApiProperty({ description: '카테고리', enum: Categories })
  @Column({
    type: 'enum',
    enum: Categories,
    name: 'category',
  })
  category: Categories;

  @ApiProperty({ description: '제목', type: String })
  @Column({ name: 'title' })
  title: string;

  @ApiProperty({ description: '본문', type: String })
  @Column({ name: 'body' })
  body: string;

  @ApiProperty({ description: '조회수', type: Number })
  @Column({ name: 'view_count', default: 0 })
  viewCount: number;

  @ApiProperty({ description: '게시글 작성자', type: () => UserEntity })
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ApiProperty({
    description: '게시글 댓글 목록',
    isArray: true,
    type: () => CommentEntity,
  })
  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];
}
