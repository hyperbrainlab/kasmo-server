import { ApiProperty } from '@nestjs/swagger';

import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { PostEntity } from '../post/post.entity';
import { CommentEntity } from '../comment/comment.entity';
import { UserBlockEntity } from '../user_block/user_block.entity';
import { ReportEntity } from '../report/report.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @ApiProperty({ description: 'User Primary Key' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'firebase UID' })
  @Column({ type: 'uuid', unique: true })
  uid: string;

  @ApiProperty({ description: '이메일 주소' })
  @Column()
  email: string;

  @ApiProperty({
    description: '비즈니스(스토어) 이름',
    required: false,
    nullable: true,
  })
  @Column({ nullable: true })
  biz_name: string;

  @ApiProperty({ description: '이름' })
  @Column()
  name: string;

  @ApiProperty({
    description: '프로필 이미지 URL',
    required: false,
    nullable: true,
  })
  @Column({ nullable: true })
  profile_image_url: string;

  @ApiProperty({ description: '핸드폰 번호' })
  @Column()
  phone_no: string;

  @ApiProperty({
    enum: ['EMAIL', 'GOOGLE', 'APPLE', 'KAKAO'],
  })
  @Column()
  provider: string;

  @ApiProperty({ description: '사업자 여부', default: false })
  @Column({ default: false })
  is_biz: boolean;

  @ApiProperty({ description: '생성일자' })
  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Date;

  @ApiProperty({ description: '최근 업데이트 일자' })
  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: Date;

  @ApiProperty({ description: '유저가 작성한 게시글' })
  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @ApiProperty({ description: '유저가 작성한 댓글' })
  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @ApiProperty({ description: '유저가 행한 블록' })
  @OneToMany(() => UserBlockEntity, (userBlock) => userBlock.blocker)
  blocks_made: UserBlockEntity[];

  @ApiProperty({ description: '유저가 당한 블록' })
  @OneToMany(() => UserBlockEntity, (userBlock) => userBlock.blocked)
  blocks_received: UserBlockEntity[];

  @ApiProperty({ description: '유저가 행한 신고' })
  @OneToMany(() => ReportEntity, (report) => report.reporter)
  reports_made: ReportEntity[];

  @ApiProperty({ description: '유저가 당한 신고' })
  @OneToMany(() => ReportEntity, (report) => report.reported)
  reports_received: ReportEntity[];
}
