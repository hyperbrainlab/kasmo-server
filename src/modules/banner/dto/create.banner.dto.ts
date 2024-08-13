import { IsString, IsNotEmpty, IsNumber, IsEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBannerRequest {
  @ApiProperty({ description: '이미지 url', required: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({ description: '설명', required: false, nullable: true })
  @IsString()
  @IsEmpty()
  description: string;

  @ApiProperty({ description: '순서', required: true, nullable: false })
  @IsNumber()
  @IsNotEmpty()
  order: number;
}
