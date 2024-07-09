import { IsNotEmpty } from 'class-validator';

export class LoginResponseDto {
  @IsNotEmpty()
  access_token: string;
}
