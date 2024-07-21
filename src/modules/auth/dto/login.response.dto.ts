import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty()
  @IsNotEmpty()
  @Expose({ name: 'access_token' })
  accessToken: string;
}
