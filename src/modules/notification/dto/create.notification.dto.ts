import { IsNotEmpty, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationRequest {
  @ApiProperty({
    description: '채팅 알림',
    required: true,
    nullable: false,
    default: false,
  })
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsNotEmpty()
  chatNotification: boolean;

  @ApiProperty({
    description: '게시글 댓글 알림',
    required: true,
    nullable: false,
    default: false,
  })
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsNotEmpty()
  postCommentNotification: boolean;

  @ApiProperty({
    description: '대댓글 알림',
    required: true,
    nullable: false,
    default: false,
  })
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsNotEmpty()
  replyCommentNotification: boolean;

  @ApiProperty({
    description: '전체 공지 알림',
    required: true,
    nullable: false,
    default: false,
  })
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsNotEmpty()
  announcementNotification: boolean;
}

export interface SendNotificationMulticast {
  userIds: number[];
  title: string;
  body: string;
}
