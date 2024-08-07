import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { Categories } from '../constants';
import { IsValidSubCategory } from 'src/decorators/valid_sub_category';

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

  @ApiProperty({ description: '카테고리', required: true, nullable: false })
  @IsEnum(Categories)
  @IsNotEmpty()
  @Expose({ name: 'category' })
  category: Categories;

  @IsString()
  @IsValidSubCategory({
    message: 'Invalid subCategory for the specified category',
  })
  subCategory: string;
}
