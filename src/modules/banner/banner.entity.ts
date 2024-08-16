import { Entity, Column } from 'typeorm';

import { AbstractEntity } from '../common/entity/abstract.entity';

@Entity('banner')
export class BannerEntity extends AbstractEntity {
  @Column({ type: 'text' })
  imageUrl: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'integer' })
  order: number;
}
