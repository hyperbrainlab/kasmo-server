import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponse<T> {
  @ApiProperty({ description: '응답 데이터' })
  @IsNotEmpty()
  data: T;

  @ApiProperty({ description: '현재 페이지' })
  @IsNotEmpty()
  page: number;

  @ApiProperty({ description: '제한 갯수' })
  @IsNotEmpty()
  size: number;

  @ApiProperty({ description: '총 갯수' })
  @IsNotEmpty()
  total: number;
}
