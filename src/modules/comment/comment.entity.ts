import { ApiProperty } from '@nestjs/swagger';

import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import { PostEntity } from '../post/post.entity';
import { UserEntity } from '../user/user.entity';
import { AbstractEntity } from '../common/entity/abstract.entity';

@Entity('comment')
export class CommentEntity extends AbstractEntity {
  @ApiProperty({ description: '본문' })
  @Column()
  body: string;

  @ApiProperty({ description: '게시글 정보' })
  @ManyToOne(() => PostEntity)
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;

  @ApiProperty({ description: '상위 댓글 정보' })
  @ManyToOne(() => CommentEntity)
  @JoinColumn({ name: 'parent_comment_id' })
  parent_comment: CommentEntity;

  @ApiProperty({ description: '하위 댓글 정보' })
  @OneToMany(() => CommentEntity, (comment) => comment.parent_comment)
  child_comments: CommentEntity[];

  @ApiProperty({ description: '작성자 정보' })
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
