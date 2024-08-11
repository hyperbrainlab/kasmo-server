import { IsString, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/modules/user/user.entity';

export class ChatRoomResponse {
  @ApiProperty({ description: 'primary key', type: Number })
  @Expose({ name: 'id' })
  id: number;

  @ApiProperty({
    description: '생성자',
  })
  @IsNotEmpty()
  creator: UserEntity;

  @ApiProperty({
    description: '상대방',
  })
  @IsNotEmpty()
  recipient: UserEntity;

  @ApiProperty({
    description: '마지막 메시지',
    required: true,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'last_message' })
  lastMessage: string;

  @ApiProperty({
    description: '마지막 메시지 시간',
  })
  @IsNotEmpty()
  @Expose({ name: 'last_message_time' })
  lastMessageTime: Date;

  @ApiProperty({
    description: '읽지 않은 메시지 수',
  })
  @IsNotEmpty()
  @Expose({ name: 'unread_messages_count' })
  unreadMessagesCount: number;
}
