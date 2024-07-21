import { IsBoolean, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from 'src/modules/user/user.entity';

import { Provider } from '../constants';

export class SignupRequest {
  uid: UserEntity['uid'];
  name: UserEntity['name'];
  email: UserEntity['email'];
  phoneNo: UserEntity['phone_no'];
  profileImageUrl: UserEntity['profile_image_url'];
  bizName: UserEntity['biz_name'];

  @ApiProperty({
    enum: Provider,
  })
  @IsEnum(Provider, {
    message: () => {
      const values = Object.values(Provider).join(', ');
      return `provider must be one of the following values: ${values}`;
    },
  })
  provider: string;

  @ApiProperty({ description: '사업자 여부', default: false })
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isBiz: boolean;
}
