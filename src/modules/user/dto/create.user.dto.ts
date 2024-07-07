import { UserEntity } from '../user.entity';

export interface CreateUserDto extends Partial<UserEntity> {}
