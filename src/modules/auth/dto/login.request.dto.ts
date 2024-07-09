import { IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
  @IsNotEmpty()
  uid: string;
}
