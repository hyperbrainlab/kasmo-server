import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { UserEntity } from '../user.entity';

export class UpdateUserNameRequest {
  @ApiProperty({ description: '이름', type: String })
  @Expose({ name: 'name' })
  name: UserEntity['name'];
}
