import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/modules/user/user.entity';

export class SigninDto extends PickType(UserEntity, ['uid']) {}
