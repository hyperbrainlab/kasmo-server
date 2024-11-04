import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';

import { AbstractEntity } from '../common/entity/abstract.entity';
import { UserEntity } from '../user/user.entity';

@Entity('notification')
export class NotificationEntity extends AbstractEntity {
  @Column({ type: 'boolean', default: false })
  chatNotification: boolean;

  @Column({ type: 'boolean', default: false })
  postCommentNotification: boolean;

  @Column({ type: 'boolean', default: false })
  replyCommentNotification: boolean;

  @Column({ type: 'boolean', default: false })
  announcementNotification: boolean;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
