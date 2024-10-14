import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { AbstractEntity } from '../common/entity/abstract.entity';
import { UserEntity } from '../user/user.entity';

@Entity('chat_room')
export class ChatRoomEntity extends AbstractEntity {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'creator_id' })
  creator: UserEntity;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'recipient_id' })
  recipient: UserEntity;

  @Column({ type: 'text', nullable: true })
  lastMessage: string;

  @Column({ type: 'timestamp', nullable: true })
  lastMessageTime: Date;

  @Column({ type: 'integer', nullable: true })
  unreadMessagesCount: number;

  @Column({ type: 'text', nullable: true })
  searchText: string;
}
