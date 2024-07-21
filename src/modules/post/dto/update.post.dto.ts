import { IsString, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostRequest {
  @ApiProperty({ description: '게시글 제목', required: true, nullable: false })
  @IsString()
  @IsOptional()
  @Expose({ name: 'title' })
  title?: string;

  @ApiProperty({ description: '게시글 본문', required: true, nullable: false })
  @IsString()
  @IsOptional()
  @Expose({ name: 'body' })
  body?: string;
}
