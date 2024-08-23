import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEmpty,
  IsEnum,
  IsOptional,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Categories, SubCategories } from 'src/modules/post/constants';

export class CreateBannerRequest {
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
  categiry: Categories;

  @ApiProperty({ description: '이미지 url', required: true, nullable: false })
  @IsEnum(SubCategories, {
    message: () => {
      const values = Object.values(SubCategories).join(', ');
      return `sub category must be one of the following values: ${values}`;
    },
  })
  @IsOptional()
  subCategory: SubCategories;

  @ApiProperty({ description: '설명', required: false, nullable: true })
  @IsString()
  @IsEmpty()
  description: string;

  @ApiProperty({ description: '게시 시작일', required: false, nullable: true })
  @IsDate()
  @IsOptional()
  startDate: Date;

  @ApiProperty({ description: '게시 종료일', required: false, nullable: true })
  @IsDate()
  @IsOptional()
  endDate: Date;

  @ApiProperty({ description: '순서', required: true, nullable: false })
  @IsNumber()
  @IsNotEmpty()
  order: number;
}
