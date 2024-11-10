import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { UserEntity } from 'src/modules/user/user.entity';

import { Provider } from '../constants';
import { UserType } from 'src/modules/user/constants';

export class SignupRequest {
  @ApiProperty({ description: 'firebase uid', type: String })
  @Expose({ name: 'uid' })
  uid: UserEntity['uid'];

  @ApiProperty({ description: '이름', type: String })
  @Expose({ name: 'name' })
  name: UserEntity['name'];

  @ApiProperty({ description: '이메일 주소', type: String })
  @Expose({ name: 'email' })
  email: UserEntity['email'];

  @ApiProperty({ description: '핸드폰 번호', type: String })
  @Expose({ name: 'phone_no' })
  phoneNo: UserEntity['phoneNo'];

  @ApiProperty({
    description: '프로필 이미지 URL',
    required: false,
    nullable: true,
    type: String,
  })
  @Expose({ name: 'profile_image_url' })
  profileImageUrl: UserEntity['profileImageUrl'];

  @ApiProperty({
    description: '비즈니스(스토어) 이름',
    required: false,
    nullable: true,
    type: String,
  })
  @Expose({ name: 'biz_name' })
  bizName: UserEntity['bizName'];

  @ApiProperty({
    enum: Provider,
  })
  @IsEnum(Provider, {
    message: () => {
      const values = Object.values(Provider).join(', ');
      return `provider must be one of the following values: ${values}`;
    },
  })
  @Expose({ name: 'provider' })
  provider: Provider;

  @ApiProperty({ description: '유저 타입', default: UserType.USER })
  @IsEnum(UserType, {
    message: () => {
      const values = Object.values(UserType).join(', ');
      return `user type must be one of the following values: ${values}`;
    },
  })
  @Expose({ name: 'user_type' })
  userType: UserType;

  @ApiProperty({ description: 'fcm 토큰', type: String })
  @IsString()
  @Expose({ name: 'fcm_token' })
  fcmToken: string;

  @ApiProperty({ description: 'notification ID', type: Number })
  @Expose({ name: 'notification_id' })
  notificationId?: number;
}
