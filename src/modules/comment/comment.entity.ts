import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { PostEntity } from '../post/post.entity';
import { UserEntity } from '../user/user.entity';
import { AbstractEntity } from '../common/entity/abstract.entity';

@Entity('comment')
export class CommentEntity extends AbstractEntity {
  @ApiProperty({ description: '본문', type: String })
  @Column({ name: 'body' })
  body: string;

  @ApiProperty({ description: '게시글 정보', type: () => PostEntity })
  @ManyToOne(() => PostEntity, (post) => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;

  @ApiProperty({ description: '상위 댓글 정보', type: () => CommentEntity })
  @ManyToOne(() => CommentEntity, (comment) => comment.childComments)
  @JoinColumn({ name: 'parent_comment_id' })
  parentComment: CommentEntity;

  @ApiProperty({
    description: '하위 댓글 정보',
    type: () => [CommentEntity],
  })
  @OneToMany(() => CommentEntity, (comment) => comment.parentComment)
  childComments: [CommentEntity];

  @ApiProperty({ description: '작성자 정보', type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
