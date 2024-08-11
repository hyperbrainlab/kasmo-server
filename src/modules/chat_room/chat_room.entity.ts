import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { AbstractEntity } from '../common/entity/abstract.entity';
import { UserEntity } from '../user/user.entity';

@Entity('chat_room')
export class ChatRoomEntity extends AbstractEntity {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'creator_id' })
  creator: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'recipient_id' })
  recipient: UserEntity;

  @Column({ type: 'text', nullable: true })
  @JoinColumn({ name: 'last_message' })
  lastMessage: string;

  @Column({ type: 'timestamp', nullable: true })
  @JoinColumn({ name: 'last_message_time' })
  lastMessageTime: Date;

  @Column({ type: 'integer', nullable: true })
  @JoinColumn({ name: 'unread_messages_count' })
  unreadMessagesCount: number;
}
