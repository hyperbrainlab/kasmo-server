import { IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNotificationRequest {
  @ApiProperty({
    description: '채팅 알림',
    required: true,
    nullable: false,
  })
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  chatNotification: boolean;

  @ApiProperty({
    description: '게시글 댓글 알림',
    required: true,
    nullable: false,
  })
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  postCommentNotification: boolean;

  @ApiProperty({
    description: '대댓글 알림',
    required: true,
    nullable: false,
  })
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  replyCommentNotification: boolean;

  @ApiProperty({
    description: '전체 공지 알림',
    required: true,
    nullable: false,
  })
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  announcementNotification: boolean;
}
