import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';

import { AbstractEntity } from '../common/entity/abstract.entity';
import { UserEntity } from '../user/user.entity';

@Entity('notification')
export class NotificationEntity extends AbstractEntity {
  @Column({ type: 'boolean', default: false })
  @JoinColumn({ name: 'chat_notification' })
  chatNotification: boolean;

  @Column({ type: 'boolean', default: false })
  @JoinColumn({ name: 'post_comment_notification' })
  postCommentNotification: boolean;

  @Column({ type: 'boolean', default: false })
  @JoinColumn({ name: 'reply_comment_notification' })
  replyCommentNotification: boolean;

  @Column({ type: 'boolean', default: false })
  @JoinColumn({ name: 'announcement_notification' })
  announcementNotification: boolean;

  @OneToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
