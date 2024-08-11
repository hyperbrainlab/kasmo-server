import { IsString, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChatRequest {
  @ApiProperty({ description: '메시지', required: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'message' })
  message: string;
}
