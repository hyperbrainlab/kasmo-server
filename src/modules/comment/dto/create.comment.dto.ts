import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentRequest {
  @ApiProperty({ description: '댓글 본문', required: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    description: '상위 댓글 아이디',
    required: false,
    nullable: true,
  })
  @IsNumber()
  @IsOptional()
  parent_comment_id?: number;

  @ApiProperty({
    description: '게시글 아이디',
    required: true,
    nullable: false,
  })
  @IsNumber()
  @IsNotEmpty()
  post_id: number;
}
