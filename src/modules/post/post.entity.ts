import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import { Categories, SubCategories } from './constants';

import { CommentEntity } from '../comment/comment.entity';
import { UserEntity } from '../user/user.entity';
import { AbstractEntity } from '../common/entity/abstract.entity';

@Entity('post')
export class PostEntity extends AbstractEntity {
  @ApiProperty({ description: '카테고리', enum: Categories })
  @Column({
    type: 'enum',
    enum: Categories,
  })
  category: Categories;

  @ApiProperty({ description: '서브 카테고리', enum: SubCategories })
  @Column({ type: 'enum', enum: SubCategories, nullable: true })
  subCategory: SubCategories;

  @ApiProperty({ description: '제목', type: String })
  @Column()
  title: string;

  @ApiProperty({ description: '본문', type: String })
  @Column({ type: 'longtext' })
  body: string;

  @ApiProperty({ description: '게시글 썸네일 이미지', type: String })
  @Column({ nullable: true })
  thumnailImageUrl: string;

  @ApiProperty({ description: '조회수', type: Number })
  @Column({ default: 0 })
  viewCount: number;

  @ApiProperty({ description: '댓글 수', type: Number })
  @Column({ default: 0 })
  commentsCount: number;

  @ApiProperty({ description: '광고 글', type: Boolean })
  @Column({ default: false })
  isAdvertise: boolean;

  @ApiProperty({ description: '게시글 작성자', type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;

  @ApiProperty({
    description: '게시글 댓글 목록',
    isArray: true,
    type: () => CommentEntity,
  })
  @OneToMany(() => CommentEntity, (comment) => comment.post, {
    cascade: true,
  })
  comments: CommentEntity[];

  @ApiProperty({ description: '상위 게시글 정보', type: () => PostEntity })
  @ManyToOne(() => PostEntity, (post) => post.childPosts, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  parentPost: PostEntity;

  @ApiProperty({
    description: '하위 게시글 정보',
    type: () => [PostEntity],
  })
  @OneToMany(() => PostEntity, (post) => post.parentPost, {
    cascade: true,
  })
  childPosts: [PostEntity];
}
