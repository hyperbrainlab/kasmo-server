import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Categories, SubCategories } from 'src/modules/post/constants';

export class BannerResponse {
  @ApiProperty({ description: '이미지 url', required: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({ description: '이미지 url', required: true, nullable: false })
  @IsEnum(Categories, {
    message: () => {
      const values = Object.values(Categories).join(', ');
      return `category must be one of the following values: ${values}`;
    },
  })
  @IsNotEmpty()
  category: Categories;

  @ApiProperty({ description: '이미지 url', required: true, nullable: false })
  @IsEnum(SubCategories, {
    message: () => {
      const values = Object.values(SubCategories).join(', ');
      return `sub category must be one of the following values: ${values}`;
    },
  })
  @IsOptional()
  subCategory: SubCategories;

  @ApiProperty({ description: '순서', required: true, nullable: false })
  @IsNumber()
  @IsNotEmpty()
  order: number;
}
