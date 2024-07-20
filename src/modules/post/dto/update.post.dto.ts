import { IsString, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostRequest {
  @ApiProperty({ description: '게시글 제목', required: true, nullable: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: '게시글 본문', required: true, nullable: false })
  @IsString()
  @IsOptional()
  body?: string;
}
