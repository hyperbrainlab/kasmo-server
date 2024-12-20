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

  @Column({ type: 'timestamp', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  @Column({ type: 'integer' })
  order: number;

  @Column({
    type: 'tinyint',
    transformer: {
      to: (value: boolean | string) => {
        if (value === 'true' || value === true) return 1;
        if (value === 'false' || value === false) return 0;
        return 0;
      },
      from: (value: number) => !!value,
    },
  })
  enabled: boolean;
}
