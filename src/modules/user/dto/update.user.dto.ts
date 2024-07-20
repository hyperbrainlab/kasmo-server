import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmpty } from 'class-validator';

export class UpdateUserRequest {
  @ApiProperty({ description: '이메일 주소', required: false, nullable: true })
  @IsString()
  @IsEmpty()
  email: string;

  @ApiProperty({ description: '이름', required: false, nullable: true })
  @IsString()
  @IsEmpty()
  name: string;

  @ApiProperty({
    description: '프로필 이미지 URL',
    required: false,
    nullable: true,
  })
  @IsString()
  @IsEmpty()
  profile_image_url: string;

  @ApiProperty({ description: '핸드폰 번호', required: false, nullable: true })
  @IsString()
  @IsEmpty()
  phone_no: string;
}
