import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { Categories } from '../constants';
import { PostEntity } from '../post.entity';
import { CommentEntity } from 'src/modules/comment/comment.entity';
import { UserEntity } from 'src/modules/user/user.entity';

export class PostListResponse {
  items: PostResponse[];
}

export class PostResponse {
  @ApiProperty({ description: 'primary key', type: Number })
  @Expose({ name: 'id' })
  id: PostEntity['id'];

  @ApiProperty({ description: '제목', type: String })
  @Expose({ name: 'title' })
  title: PostEntity['title'];

  @ApiProperty({ description: '본문', type: String })
  @Expose({ name: 'body' })
  body: PostEntity['body'];

  @ApiProperty({ enum: Categories })
  @Expose({ name: 'category' })
  category: PostEntity['category'];

  @ApiProperty({ description: '조회수', type: Number })
  @Expose({ name: 'view_count' })
  viewCount: PostEntity['viewCount'];

  @ApiProperty({
    description: '게시글 댓글 목록',
    isArray: true,
    type: () => CommentEntity,
  })
  @Expose({ name: 'comments' })
  comments: PostEntity['comments'];

  @ApiProperty({ description: '게시글 작성자', type: () => UserEntity })
  @Expose({ name: 'user' })
  user: PostEntity['user'];

  @ApiProperty({ description: '생성일자' })
  @Expose({ name: 'created_at' })
  createdAt: PostEntity['createdAt'];

  @ApiProperty({ description: '최근 업데이트 일자' })
  @Expose({ name: 'updated_at' })
  updatedAt: PostEntity['updatedAt'];
}
