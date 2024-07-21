import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginRequest {
  @ApiProperty({ description: 'firebase UID' })
  @IsNotEmpty()
  @Expose({ name: 'uid' })
  uid: string;
}
