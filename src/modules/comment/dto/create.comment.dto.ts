import { Expose } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentRequest {
  @ApiProperty({
    description: '댓글 본문',
    required: true,
    nullable: false,
    type: String,
  })
  @Expose({ name: 'body' })
  body: string;

  @ApiProperty({
    description: '상위 댓글 아이디',
    required: false,
    nullable: true,
    type: Number,
  })
  @Expose({ name: 'parent_comment_id' })
  parentCommentId?: number;

  @ApiProperty({
    description: '게시글 아이디',
    required: true,
    nullable: false,
    type: Number,
  })
  @Expose({ name: 'post_id' })
  postId: number;
}
