import { Entity, Column } from 'typeorm';

import { AbstractEntity } from '../common/entity/abstract.entity';
import { Categories, SubCategories } from '../post/constants';

@Entity('banner')
export class BannerEntity extends AbstractEntity {
  @Column({ type: 'text' })
  imageUrl: string;

  @Column({ type: 'enum', enum: Categories })
  category: Categories;

  @Column({ type: 'enum', enum: SubCategories, nullable: true })
  subCategory: SubCategories;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'integer' })
  order: number;
}
