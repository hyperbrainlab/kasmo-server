import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendNotificationRequest {
  @ApiProperty({
    description: 'token',
    required: true,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    description: '제목',
    required: true,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: '내용',
    required: true,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    description: '데이터',
    required: false,
    nullable: true,
  })
  @IsOptional()
  data?: any;
}

export class SendNotificationMulticastRequest {
  @ApiProperty({
    description: 'token',
    required: true,
    nullable: false,
  })
  @IsArray()
  @IsNotEmpty()
  tokens: string[];

  @ApiProperty({
    description: '제목',
    required: true,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: '내용',
    required: true,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    description: '데이터',
    required: false,
    nullable: true,
  })
  @IsOptional()
  data?: any;
}
