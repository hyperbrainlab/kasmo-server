import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { UserEntity } from '../user.entity';
export class UpdateUserRequest {
  @ApiProperty({ description: '이메일 주소', type: String })
  @Expose({ name: 'email' })
  email: UserEntity['email'];

  @ApiProperty({ description: '이름', type: String })
  @Expose({ name: 'name' })
  name: UserEntity['name'];

  @ApiProperty({
    description: '프로필 이미지 URL',
    required: false,
    nullable: true,
    type: String,
  })
  @Expose({ name: 'profile_image_url' })
  profileImageUrl: UserEntity['profileImageUrl'];

  @ApiProperty({ description: '핸드폰 번호', type: String })
  @Expose({ name: 'phone_no' })
  phoneNo: UserEntity['phoneNo'];
}
