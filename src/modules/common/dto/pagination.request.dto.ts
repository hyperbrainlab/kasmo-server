import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationRequest {
  @ApiProperty({ description: '현재 페이지' })
  @IsOptional()
  page?: number;

  @ApiProperty({ description: '제한 갯수' })
  @IsOptional()
  size?: number;
}
