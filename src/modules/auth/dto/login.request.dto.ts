import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({ description: 'firebase UID' })
  @IsNotEmpty()
  uid: string;
}
