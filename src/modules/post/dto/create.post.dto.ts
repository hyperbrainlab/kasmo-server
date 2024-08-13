import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { Categories, SubCategories } from '../constants';

export class CreatePostRequest {
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

  @ApiProperty({ description: '카테고리', required: true, nullable: false })
  @IsEnum(Categories)
  @IsNotEmpty()
  @Expose({ name: 'category' })
  category: Categories;

  @ApiProperty({ description: '카테고리', required: false, nullable: true })
  @IsEnum(SubCategories, {
    message: () => {
      const values = Object.values(SubCategories).join(', ');
      return `sub category must be one of the following values: ${values}`;
    },
  })
  @IsOptional()
  subCategory: SubCategories;
}
