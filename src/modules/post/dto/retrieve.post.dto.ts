import { IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';
import { PaginationRequest } from 'src/modules/common/dto/pagination.request.dto';
import { PaginationResponse } from 'src/modules/common/dto/pagination.response.dto';
import { Categories, SortBy } from '../constants';
import { PostEntity } from '../post.entity';
import { CommentEntity } from 'src/modules/comment/comment.entity';
import { UserEntity } from 'src/modules/user/user.entity';

export class PostsRequest extends PaginationRequest {
  @ApiProperty({ description: '카테고리' })
  @IsOptional()
  @Expose({ name: 'category' })
  category?: Categories;

  @ApiProperty({ description: '검색어' })
  @IsOptional()
  @Expose({ name: 'keyword' })
  keyword?: string;

  @ApiProperty({ enum: SortBy })
  @IsEnum(SortBy, {
    message: () => {
      const values = Object.values(SortBy).join(', ');
      return `order must be one of the following values: ${values}`;
    },
  })
  @IsOptional()
  @Expose({ name: 'order' })
  order?: SortBy;
}

export class PostListResponse extends PaginationResponse<PostResponse[]> {}

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
