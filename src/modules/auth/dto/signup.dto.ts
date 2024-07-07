import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/modules/user/user.entity';

export class SignupDto extends PickType(UserEntity, [
  'uid',
  'name',
  'email',
  'phone_no',
  'provider',
  'profile_image_url',
]) {}
