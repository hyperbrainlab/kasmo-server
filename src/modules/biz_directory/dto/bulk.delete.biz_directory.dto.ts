import { IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BulkDeleteDto {
  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({ type: [Number], description: 'Array of IDs to delete' })
  ids: number[];
}
