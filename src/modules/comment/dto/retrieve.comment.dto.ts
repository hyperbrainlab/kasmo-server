import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { CommentEntity } from '../comment.entity';
import { PostEntity } from 'src/modules/post/post.entity';
import { UserEntity } from 'src/modules/user/user.entity';

export class CommentResponse {
  @ApiProperty({ description: 'primary key', type: Number })
  @Expose({ name: 'id' })
  id: CommentEntity['id'];

  @ApiProperty({ description: '본문', type: String })
  @Expose({ name: 'body' })
  body: CommentEntity['body'];

  @ApiProperty({ description: '게시글 정보', type: () => PostEntity })
  @Expose({ name: 'post' })
  post: CommentEntity['post'];

  @ApiProperty({ description: '상위 댓글 정보', type: () => CommentEntity })
  @Expose({ name: 'parent_comment' })
  parentComment: CommentEntity['parentComment'];

  @ApiProperty({
    description: '하위 댓글 정보',
    type: () => [CommentEntity],
  })
  @Expose({ name: 'child_comments' })
  childComments: [CommentEntity];

  @ApiProperty({ description: '작성자 정보', type: () => UserEntity })
  @Expose({ name: 'user' })
  user: CommentEntity['user'];
}
