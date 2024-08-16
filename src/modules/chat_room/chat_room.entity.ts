import { Entity, Column, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../common/entity/abstract.entity';
import { UserEntity } from '../user/user.entity';

@Entity('chat_room')
export class ChatRoomEntity extends AbstractEntity {
  @ManyToOne(() => UserEntity)
  creator: UserEntity;

  @ManyToOne(() => UserEntity)
  recipient: UserEntity;

  @Column({ type: 'text', nullable: true })
  lastMessage: string;

  @Column({ type: 'timestamp', nullable: true })
  lastMessageTime: Date;

  @Column({ type: 'integer', nullable: true })
  unreadMessagesCount: number;
}
