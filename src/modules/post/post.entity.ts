import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, BeforeUpdate } from 'typeorm';
import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import {
  Categories,
  JobListingsSubCategories,
  UsedGoodsSubCategories,
  RealEstateSubCategories,
  BusinessDirectorySubCategories,
  PickupMovingSubCategories,
  MeetingsSubCategories,
  CurrencyExchangeSubCategories,
  BusinessMeetingsSubCategories,
  SubCategories,
} from './constants';

import { CommentEntity } from '../comment/comment.entity';
import { UserEntity } from '../user/user.entity';
import { AbstractEntity } from '../common/entity/abstract.entity';

@Entity('post')
export class PostEntity extends AbstractEntity {
  @ApiProperty({ description: '카테고리', enum: Categories })
  @Column({
    type: 'enum',
    enum: Categories,
    name: 'category',
  })
  category: Categories;

  @ApiProperty({ description: '서브 카테고리', enum: SubCategories })
  @Column({ name: 'sub_category' })
  subCategory: string;

  @BeforeInsert()
  @BeforeUpdate()
  validateSubCategory() {
    switch (this.category) {
      case Categories.JOB_LISTINGS:
        if (
          !Object.values(JobListingsSubCategories).includes(
            this.subCategory as JobListingsSubCategories,
          )
        ) {
          throw new Error(`Invalid subCategory for category ${this.category}`);
        }
        break;
      case Categories.USED_GOODS:
        if (
          !Object.values(UsedGoodsSubCategories).includes(
            this.subCategory as UsedGoodsSubCategories,
          )
        ) {
          throw new Error(`Invalid subCategory for category ${this.category}`);
        }
        break;
      case Categories.REAL_ESTATE:
        if (
          !Object.values(RealEstateSubCategories).includes(
            this.subCategory as RealEstateSubCategories,
          )
        ) {
          throw new Error(`Invalid subCategory for category ${this.category}`);
        }
        break;
      case Categories.BUSINESS_DIRECTORY:
        if (
          !Object.values(BusinessDirectorySubCategories).includes(
            this.subCategory as BusinessDirectorySubCategories,
          )
        ) {
          throw new Error(`Invalid subCategory for category ${this.category}`);
        }
        break;
      case Categories.PICKUP_MOVING:
        if (
          !Object.values(PickupMovingSubCategories).includes(
            this.subCategory as PickupMovingSubCategories,
          )
        ) {
          throw new Error(`Invalid subCategory for category ${this.category}`);
        }
        break;
      case Categories.MEETINGS:
        if (
          !Object.values(MeetingsSubCategories).includes(
            this.subCategory as MeetingsSubCategories,
          )
        ) {
          throw new Error(`Invalid subCategory for category ${this.category}`);
        }
        break;
      case Categories.CURRENCY_EXCHANGE:
        if (
          !Object.values(CurrencyExchangeSubCategories).includes(
            this.subCategory as CurrencyExchangeSubCategories,
          )
        ) {
          throw new Error(`Invalid subCategory for category ${this.category}`);
        }
        break;
      case Categories.BUSINESS_MEETINGS:
        if (
          !Object.values(BusinessMeetingsSubCategories).includes(
            this.subCategory as BusinessMeetingsSubCategories,
          )
        ) {
          throw new Error(`Invalid subCategory for category ${this.category}`);
        }
        break;
      default:
        throw new Error('Invalid category');
    }
  }

  @ApiProperty({ description: '제목', type: String })
  @Column({ name: 'title' })
  title: string;

  @ApiProperty({ description: '본문', type: String })
  @Column({ name: 'body' })
  body: string;

  @ApiProperty({ description: '조회수', type: Number })
  @Column({ name: 'view_count', default: 0 })
  viewCount: number;

  @ApiProperty({ description: '게시글 작성자', type: () => UserEntity })
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ApiProperty({
    description: '게시글 댓글 목록',
    isArray: true,
    type: () => CommentEntity,
  })
  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];
}
