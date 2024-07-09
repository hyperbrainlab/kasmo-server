import { ApiProperty } from '@nestjs/swagger';

import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @ApiProperty({ description: 'User Primary Key' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ description: 'firebase UID' })
  @Column({ type: 'uuid', unique: true })
  uid: string;

  @ApiProperty({ description: '이메일 주소' })
  @Column()
  email: string;

  @ApiProperty({ description: '이름' })
  @Column()
  name: string;

  @ApiProperty({
    description: '프로필 이미지 URL',
    required: false,
    nullable: true,
  })
  @Column({ nullable: true })
  profile_image_url: string;

  @ApiProperty({ description: '핸드폰 번호' })
  @Column()
  phone_no: string;

  @ApiProperty({
    enum: ['email', 'google', 'apple', 'kakao'],
  })
  @Column()
  provider: string;

  @ApiProperty({ description: '사업자 여부', default: false })
  @Column({ default: false })
  is_biz: boolean;

  @ApiProperty({ description: '생성일자' })
  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Date;

  @ApiProperty({ description: '최근 업데이트 일자' })
  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: Date;
}
