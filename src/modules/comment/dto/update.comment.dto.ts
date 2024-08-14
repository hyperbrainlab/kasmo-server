import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentRequest {
  @ApiProperty({ description: '댓글 본문', required: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'body' })
  body: string;

  @ApiProperty({
    description: '비밀 댓글 여부',
    required: true,
    nullable: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  @Expose({ name: 'is_private' })
  isPrivate: boolean;
}
