import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty({ description: 'firebase UID' })
  @IsNotEmpty()
  uid: string;
}
