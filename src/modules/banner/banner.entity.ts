import { Entity, Column, JoinColumn } from 'typeorm';

import { AbstractEntity } from '../common/entity/abstract.entity';

@Entity('banner')
export class BannerEntity extends AbstractEntity {
  @Column({ type: 'text' })
  @JoinColumn({ name: 'image_url' })
  imageUrl: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'integer' })
  order: number;
}
