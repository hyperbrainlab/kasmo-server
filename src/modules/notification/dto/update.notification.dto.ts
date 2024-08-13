import { IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNotificationRequest {
  @ApiProperty({
    description: '채팅 알림',
    required: true,
    nullable: false,
    default: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  chatNotification: boolean;

  @ApiProperty({
    description: '게시글 댓글 알림',
    required: true,
    nullable: false,
    default: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  postCommentNotification: boolean;

  @ApiProperty({
    description: '대댓글 알림',
    required: true,
    nullable: false,
    default: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  replyCommentNotification: boolean;

  @ApiProperty({
    description: '전체 공지 알림',
    required: true,
    nullable: false,
    default: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  announcementNotification: boolean;
}
