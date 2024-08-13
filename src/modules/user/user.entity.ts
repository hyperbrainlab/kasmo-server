import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { PostEntity } from '../post/post.entity';
import { CommentEntity } from '../comment/comment.entity';
import { UserBlockEntity } from '../user_block/user_block.entity';
import { ReportEntity } from '../report/report.entity';
import { AbstractEntity } from '../common/entity/abstract.entity';
import { Provider } from '../auth/constants';
import { ChatRoomEntity } from '../chat_room/chat_room.entity';
import { NotificationEntity } from '../notification/notification.entity';

@Entity('user')
export class UserEntity extends AbstractEntity {
  @ApiProperty({ description: 'firebase uid', type: String })
  @Column({ type: 'uuid', unique: true, name: 'uid' })
  uid: string;

  @ApiProperty({ description: '이메일 주소', type: String })
  @Column({
    name: 'email',
  })
  email: string;

  @ApiProperty({
    description: '비즈니스(스토어) 이름',
    required: false,
    nullable: true,
    type: String,
  })
  @Column({ nullable: true, name: 'biz_name' })
  bizName: string;

  @ApiProperty({ description: '이름', type: String })
  @Column({ name: 'name' })
  name: string;

  @ApiProperty({
    description: '프로필 이미지 URL',
    required: false,
    nullable: true,
    type: String,
  })
  @Column({ nullable: true, name: 'profile_image_url' })
  profileImageUrl: string;

  @ApiProperty({ description: '핸드폰 번호', type: String })
  @Column({ name: 'phone_no' })
  phoneNo: string;

  @ApiProperty({
    enum: Provider,
  })
  @Column({ name: 'provider' })
  provider: string;

  @ApiProperty({ description: '사업자 여부', default: false, type: Boolean })
  @Column({ default: false, name: 'is_biz' })
  isBiz: boolean;

  @ApiProperty({
    description: '유저가 작성한 게시글',
    type: () => [PostEntity],
  })
  @OneToMany(() => PostEntity, (post) => post.user)
  posts: [PostEntity];

  @ApiProperty({
    description: '유저가 작성한 댓글',
    type: () => [CommentEntity],
  })
  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: [CommentEntity];

  @ApiProperty({
    description: '유저가 행한 블록',
    type: () => [UserBlockEntity],
  })
  @OneToMany(() => UserBlockEntity, (userBlock) => userBlock.blocker)
  blocksMade: [UserBlockEntity];

  @ApiProperty({
    description: '유저가 당한 블록',
    type: () => [UserBlockEntity],
  })
  @OneToMany(() => UserBlockEntity, (userBlock) => userBlock.blocked)
  blocksReceived: [UserBlockEntity];

  @ApiProperty({
    description: '유저가 행한 신고',
    type: () => [ReportEntity],
  })
  @OneToMany(() => ReportEntity, (report) => report.reporter)
  reportsMade: [ReportEntity];

  @ApiProperty({
    description: '유저가 당한 신고',
    type: () => [ReportEntity],
  })
  @OneToMany(() => ReportEntity, (report) => report.reported)
  reportsReceived: [ReportEntity];

  @ApiProperty({
    description: '',
    type: () => [ChatRoomEntity],
  })
  @OneToMany(() => ChatRoomEntity, (chatRoom) => chatRoom.creator)
  createdChatRooms: [ChatRoomEntity];

  @ApiProperty({
    description: '',
    type: () => [ChatRoomEntity],
  })
  @OneToMany(() => ChatRoomEntity, (chatRoom) => chatRoom.recipient)
  chatRoomsForRecipients: [ChatRoomEntity];

  @OneToOne(() => NotificationEntity, (notification) => notification.user)
  @JoinColumn({ name: 'notification_id' })
  notification: NotificationEntity;
}
