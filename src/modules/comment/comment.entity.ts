import { Entity, Column, ManyToOne, OneToMany, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { PostEntity } from '../post/post.entity';
import { UserEntity } from '../user/user.entity';
import { AbstractEntity } from '../common/entity/abstract.entity';

@Entity('comment')
@Index(['post', 'user']) // 복합 인덱스 추가
export class CommentEntity extends AbstractEntity {
  @ApiProperty({ description: '본문', type: String })
  @Column({ name: 'body', type: 'text' }) // 'text' 타입으로 변경
  body: string;

  @ApiProperty({ description: '게시글 정보', type: () => PostEntity })
  @ManyToOne(() => PostEntity, (post) => post.comments, { onDelete: 'CASCADE' })
  @Index() // 인덱스 추가
  post: PostEntity;

  @ApiProperty({ description: '상위 댓글 정보', type: () => CommentEntity })
  @ManyToOne(() => CommentEntity, (comment) => comment.childComments, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parentComment: CommentEntity | null;

  @ApiProperty({
    description: '하위 댓글 정보',
    type: () => [CommentEntity],
  })
  @OneToMany(() => CommentEntity, (comment) => comment.parentComment, {
    cascade: true,
  })
  childComments: CommentEntity[];

  @ApiProperty({ description: '작성자 정보', type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.comments, {
    onDelete: 'SET NULL',
  })
  @Index() // 인덱스 추가
  user: UserEntity;

  @ApiProperty({ description: '비밀 댓글 여부', type: Boolean })
  @Column({ type: 'boolean', default: false, name: 'is_private' })
  isPrivate: boolean;
}
