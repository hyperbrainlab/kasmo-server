import { IsString, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentRequest {
  @ApiProperty({ description: '댓글 본문', required: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  body: string;
}
