import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../common/entity/abstract.entity';
import { BusinessDirectoryCategories } from './constants';
import { UserEntity } from '../user/user.entity';

@Entity('biz_directory')
export class BizDirectoryEntity extends AbstractEntity {
  @Column({ type: 'text' })
  name: string;

  @Column({
    type: 'enum',
    enum: BusinessDirectoryCategories,
    name: 'category',
  })
  category: BusinessDirectoryCategories;

  @ManyToOne(() => UserEntity, (user) => user.bizDirectories)
  @JoinColumn()
  owner: UserEntity;

  @Column({ type: 'text' })
  telNo: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  website: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'text' })
  latitude: string;

  @Column({ type: 'text' })
  longitude: string;
}
