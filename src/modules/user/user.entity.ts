import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { PostEntity } from '../post/post.entity';
import { CommentEntity } from '../comment/comment.entity';
import { UserBlockEntity } from '../user_block/user_block.entity';
import { ReportEntity } from '../report/report.entity';
import { AbstractEntity } from '../common/entity/abstract.entity';
import { Provider } from '../auth/constants';
import { ChatRoomEntity } from '../chat_room/chat_room.entity';
import { NotificationEntity } from '../notification/notification.entity';
import { UserType } from './constants';
import { BizDirectoryEntity } from '../biz_directory/biz_directory.entity';

@Entity('user')
export class UserEntity extends AbstractEntity {
  @ApiProperty({ description: 'firebase uid', type: String })
  @Column({ type: 'uuid', unique: true, name: 'uid' })
  uid: string;

  @ApiProperty({ description: '이메일 주소', type: String })
  @Column({ name: 'email' })
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

  @ApiProperty({ enum: Provider })
  @Column({ name: 'provider' })
  provider: Provider;

  @ApiProperty({ enum: UserType })
  @Column({ name: 'user_type' })
  userType: UserType;

  /** @deprecated */
  @Column({ name: 'is_biz', type: 'boolean' })
  isBiz: boolean;

  @ApiProperty({ description: 'fcm 토큰', type: String })
  @Column({ name: 'fcm_token', type: 'longtext' })
  fcmToken: string;

  @ApiProperty({ description: '탈퇴한 일자' })
  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
  })
  deletedAt: Date;

  @ApiProperty({ description: '닉네임 변경 일자' })
  @DeleteDateColumn({
    type: 'timestamp',
    name: 'name_changed_at',
  })
  nameChangedAt: Date;

  @ApiProperty({
    description: '관리자 로그인 ID',
    required: false,
    type: String,
  })
  @Column({ nullable: true, name: 'user_id', unique: true })
  userId: string;

  @ApiProperty({
    description: '관리자 비밀번호 (해시됨)',
    required: false,
    type: String,
  })
  @Column({ nullable: true, name: 'password' })
  password: string;

  @ApiProperty({
    description: '유저가 작성한 게시글',
    type: () => [PostEntity],
  })
  @OneToMany(() => PostEntity, (post) => post.user, {
    cascade: true,
  })
  posts: PostEntity[];

  @ApiProperty({
    description: '유저가 작성한 댓글',
    type: () => [CommentEntity],
  })
  @OneToMany(() => CommentEntity, (comment) => comment.user, {
    cascade: true,
  })
  comments: [CommentEntity];

  @ApiProperty({
    description: '유저가 행한 블록',
    type: () => [UserBlockEntity],
  })
  @OneToMany(() => UserBlockEntity, (userBlock) => userBlock.blocker, {
    cascade: true,
  })
  blocksMade: [UserBlockEntity];

  @ApiProperty({
    description: '유저가 당한 블록',
    type: () => [UserBlockEntity],
  })
  @OneToMany(() => UserBlockEntity, (userBlock) => userBlock.blocked, {
    cascade: true,
  })
  blocksReceived: [UserBlockEntity];

  @ApiProperty({
    description: '유저가 행한 신고',
    type: () => [ReportEntity],
  })
  @OneToMany(() => ReportEntity, (report) => report.reporter, {
    cascade: true,
  })
  reportsMade: [ReportEntity];

  @ApiProperty({
    description: '유저가 당한 신고',
    type: () => [ReportEntity],
  })
  @OneToMany(() => ReportEntity, (report) => report.reported, {
    cascade: true,
  })
  reportsReceived: [ReportEntity];

  @ApiProperty({
    description: '생성한 채팅방',
    type: () => [ChatRoomEntity],
  })
  @OneToMany(() => ChatRoomEntity, (chatRoom) => chatRoom.creator, {
    cascade: true,
  })
  createdChatRooms: [ChatRoomEntity];

  @ApiProperty({
    description: '참여한 채팅방',
    type: () => [ChatRoomEntity],
  })
  @OneToMany(() => ChatRoomEntity, (chatRoom) => chatRoom.recipient, {
    cascade: true,
  })
  chatRoomsForRecipients: [ChatRoomEntity];

  @ApiProperty({
    description: '사용자 알림 설정',
    type: () => NotificationEntity,
  })
  @OneToOne(() => NotificationEntity, (notification) => notification.user, {
    cascade: true,
  })
  @JoinColumn({ name: 'notification_id' })
  notification: NotificationEntity;

  @ApiProperty({
    description: '유저가 소유한 비즈니스 디렉토리',
    type: () => [BizDirectoryEntity],
  })
  @OneToMany(() => BizDirectoryEntity, (bizDirectory) => bizDirectory.owner, {
    cascade: true,
  })
  @JoinColumn()
  bizDirectories: [BizDirectoryEntity];
}
