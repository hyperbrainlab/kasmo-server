import { IsString, IsEnum, IsOptional, IsEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { Categories, SubCategories } from '../constants';

export class UpdatePostRequest {
  @ApiProperty({ description: '게시글 제목', required: true, nullable: false })
  @IsString()
  @IsOptional()
  @Expose({ name: 'title' })
  title: string;

  @ApiProperty({ description: '게시글 본문', required: true, nullable: false })
  @IsString()
  @IsOptional()
  @Expose({ name: 'body' })
  body: string;

  @ApiProperty({
    description: '게시글 썸네일 이미지',
    type: String,
    required: false,
    nullable: true,
  })
  @IsString()
  @IsEmpty()
  thumnailImageUrl: string;

  @ApiProperty({ description: '카테고리', required: true, nullable: false })
  @IsEnum(Categories)
  @IsOptional()
  @Expose({ name: 'category' })
  category: Categories;

  @ApiProperty({ description: '카테고리', required: false, nullable: true })
  @IsString()
  @IsOptional()
  subCategory: SubCategories;
}
