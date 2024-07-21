import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ReportType } from '../constants';

export class ReportRequest {
  @ApiProperty({
    enum: ReportType,
  })
  @IsEnum(ReportType, {
    message: () => {
      const values = Object.values(ReportType).join(', ');
      return `report_type must be one of the following values: ${values}`;
    },
  })
  reportType: ReportType;
}
