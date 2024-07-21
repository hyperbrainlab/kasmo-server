import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import { PostEntity } from '../post/post.entity';
import { UserEntity } from '../user/user.entity';
import { AbstractEntity } from '../common/entity/abstract.entity';

@Entity('comment')
export class CommentEntity extends AbstractEntity {
  @Column({ name: 'body' })
  body: string;

  @ManyToOne(() => PostEntity)
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;

  @ManyToOne(() => CommentEntity)
  @JoinColumn({ name: 'parent_comment_id' })
  parentComment: CommentEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.parentComment)
  childComments: [CommentEntity];

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
