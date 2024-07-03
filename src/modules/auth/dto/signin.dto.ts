import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/modules/user/user.entity';

export class SignInDto extends PickType(UserEntity, ['user_id']) {
  password!: string;
}
