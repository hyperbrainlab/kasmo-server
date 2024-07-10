import { IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/modules/user/user.entity';

export class SignupDto extends PickType(UserEntity, [
  'uid',
  'name',
  'email',
  'phone_no',
  'provider',
  'profile_image_url',
  'biz_name',
]) {
  @ApiProperty({ description: '사업자 여부', default: false })
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  is_biz: boolean;
}
