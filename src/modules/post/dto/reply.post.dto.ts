import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

export class ReplyPostRequest {
  @ApiProperty({ description: '게시글 제목', required: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'title' })
  title: string;

  @ApiProperty({ description: '게시글 본문', required: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'body' })
  body: string;

  @ApiProperty({
    description: '게시글 썸네일 이미지',
    type: String,
    required: false,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  thumnailImageUrl: string;

  @ApiProperty({ description: '상위 게시글 ID', type: Number })
  parentPostId: number;
}
