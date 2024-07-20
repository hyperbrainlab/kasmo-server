import { IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationRequest } from 'src/modules/common/dto/pagination.request.dto';
import { PaginationResponse } from 'src/modules/common/dto/pagination.response.dto';
import { Categories, SortBy } from '../constants';
import { PostEntity } from '../post.entity';

export class PostsRequest extends PaginationRequest {
  @ApiProperty({ description: '카테고리' })
  @IsOptional()
  category?: Categories;

  @ApiProperty({ description: '검색어' })
  @IsOptional()
  keyword?: string;

  @ApiProperty({ enum: SortBy })
  @IsEnum(SortBy, {
    message: () => {
      const values = Object.values(SortBy).join(', ');
      return `order must be one of the following values: ${values}`;
    },
  })
  @IsOptional()
  order?: SortBy;
}

export class PostsResponse extends PaginationResponse<PostEntity[]> {}

export class PostResponse extends PostEntity {}
