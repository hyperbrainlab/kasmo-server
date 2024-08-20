import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UpdateFcmTokenRequest {
  @ApiProperty({ description: 'firebase UID' })
  @IsNotEmpty()
  @Expose({ name: 'uid' })
  uid: string;

  @ApiProperty({ description: 'fcm 토큰', type: String })
  @IsString()
  @Expose({ name: 'fcm_token' })
  fcmToken: string;
}
