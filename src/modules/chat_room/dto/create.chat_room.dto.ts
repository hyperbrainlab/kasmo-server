import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChatRoomRequest {
  @ApiProperty({
    description: '상대방 ID',
  })
  @IsNotEmpty()
  recipientId: number;
}
