import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmpty, IsOptional } from 'class-validator';

export class UpdateUserRequest {
  @ApiProperty({ description: '이메일 주소', required: false, nullable: true })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: '이름', required: false, nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: '프로필 이미지 URL',
    required: false,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  profile_image_url?: string;

  @ApiProperty({ description: '핸드폰 번호', required: false, nullable: true })
  @IsString()
  @IsOptional()
  phone_no?: string;
}
