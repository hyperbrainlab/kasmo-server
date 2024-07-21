import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserEntity } from '../user.entity';
import { Provider } from 'src/modules/auth/constants';
import { PostEntity } from 'src/modules/post/post.entity';
import { CommentEntity } from 'src/modules/comment/comment.entity';
import { UserBlockEntity } from 'src/modules/user_block/user_block.entity';
import { ReportEntity } from 'src/modules/report/report.entity';

export class UserProfileResponse {
  @ApiProperty({ description: 'primary key', type: Number })
  @Expose({ name: 'id' })
  id: UserEntity['id'];

  @ApiProperty({ description: 'firebase uid', type: String })
  @Expose({ name: 'uid' })
  uid: UserEntity['uid'];

  @ApiProperty({ description: '이메일 주소', type: String })
  @Expose({ name: 'email' })
  email: UserEntity['email'];

  @ApiProperty({
    description: '비즈니스(스토어) 이름',
    required: false,
    nullable: true,
    type: String,
  })
  @Expose({ name: 'biz_name' })
  bizName: UserEntity['bizName'];

  @ApiProperty({ description: '이름', type: String })
  @Expose({ name: 'name' })
  name: UserEntity['name'];

  @ApiProperty({
    description: '프로필 이미지 URL',
    required: false,
    nullable: true,
    type: String,
  })
  @Expose({ name: 'profile_image_url' })
  profileImageUrl: UserEntity['profileImageUrl'];

  @ApiProperty({ description: '핸드폰 번호', type: String })
  @Expose({ name: 'phone_no' })
  phoneNo: UserEntity['phoneNo'];

  @ApiProperty({
    enum: Provider,
  })
  @Expose({ name: 'provider' })
  provider: UserEntity['provider'];

  @ApiProperty({ description: '사업자 여부', default: false, type: Boolean })
  @Expose({ name: 'is_biz' })
  isBiz: UserEntity['isBiz'];

  @ApiProperty({
    description: '유저가 작성한 게시글',
    type: () => [PostEntity],
  })
  @Expose({ name: 'posts' })
  posts: [PostEntity];

  @ApiProperty({
    description: '유저가 작성한 댓글',
    type: () => [CommentEntity],
  })
  @Expose({ name: 'comments' })
  comments: [CommentEntity];

  @ApiProperty({
    description: '유저가 행한 블록',
    type: () => [UserBlockEntity],
  })
  @Expose({ name: 'blocks_made' })
  blocksMade: [UserBlockEntity];

  @ApiProperty({
    description: '유저가 당한 블록',
    type: () => [UserBlockEntity],
  })
  @Expose({ name: 'blocks_received' })
  blocksReceived: [UserBlockEntity];

  @ApiProperty({
    description: '유저가 행한 신고',
    type: () => [ReportEntity],
  })
  @Expose({ name: 'reports_made' })
  reportsMade: [ReportEntity];

  @ApiProperty({
    description: '유저가 당한 신고',
    type: () => [ReportEntity],
  })
  @Expose({ name: 'reports_received' })
  reportsReceived: [ReportEntity];
}
