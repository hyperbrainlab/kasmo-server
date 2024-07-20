import { IsNumber, IsString, IsEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ description: '댓글 본문', required: true, nullable: false })
  @IsString()
  @IsEmpty()
  body: string;

  @ApiProperty({
    description: '상위 댓글 아이디',
    required: false,
    nullable: true,
  })
  @IsNumber()
  @IsEmpty()
  parent_comment_id?: number;

  @ApiProperty({
    description: '게시글 아이디',
    required: true,
    nullable: false,
  })
  @IsNumber()
  @IsEmpty()
  post_id: number;
}
