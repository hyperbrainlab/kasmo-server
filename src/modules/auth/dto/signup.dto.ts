import { IsBoolean, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/modules/user/user.entity';

import { Provider } from '../constants';

export class SignupRequest extends PickType(UserEntity, [
  'uid',
  'name',
  'email',
  'phone_no',
  'profile_image_url',
  'biz_name',
]) {
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
  is_biz: boolean;
}
