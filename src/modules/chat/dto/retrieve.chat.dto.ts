import { IsString, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class Message {
  @ApiProperty({
    description: '채팅방 아이디',
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @Expose({ name: 'room_id' })
  roomId: number;

  @ApiProperty({ description: '메시지', required: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'text' })
  text: string;

  @ApiProperty({ description: '타임스탬프', required: true, nullable: false })
  @IsNotEmpty()
  @Expose({ name: 'timestamp' })
  timestamp: number;

  @ApiProperty({ description: '보낸 사람 ID', required: true, nullable: false })
  @IsNotEmpty()
  @Expose({ name: 'sender_id' })
  senderId: number;

  @ApiProperty({
    description: '읽은 사람',
    required: true,
    nullable: false,
    example: {
      1: true,
      2: true,
    },
  })
  @IsNotEmpty()
  @Expose({ name: 'read_by' })
  readBy: {
    [userId: string]: boolean;
  };
}
