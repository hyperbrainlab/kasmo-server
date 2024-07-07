import { UserEntity } from '../user.entity';

export interface UpdateUserDto extends Partial<UserEntity> {}
