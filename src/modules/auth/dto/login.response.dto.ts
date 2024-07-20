import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty()
  @IsNotEmpty()
  access_token: string;
}
