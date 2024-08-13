import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BusinessDirectoryCategories } from '../constants';

export class BizDirectoryResponse {
  @ApiProperty({ description: '업소 이름', required: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '카테고리', required: true, nullable: false })
  @IsEnum(BusinessDirectoryCategories, {
    message: () => {
      const values = Object.values(BusinessDirectoryCategories).join(', ');
      return `category must be one of the following values: ${values}`;
    },
  })
  @IsNotEmpty()
  category: BusinessDirectoryCategories;

  @ApiProperty({ description: '대표명', required: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  owner: string;

  @ApiProperty({ description: '전화번호', required: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  telNo: string;

  @ApiProperty({ description: '이메일', required: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: '웹사이트', required: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  website: string;

  @ApiProperty({ description: '주소', required: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: '위도', required: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  latitude: string;

  @ApiProperty({ description: '경도', required: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  longitude: string;
}
