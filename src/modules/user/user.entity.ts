import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: string;

  @Column()
  password_hash!: string;

  @Column()
  name!: string;

  @Column()
  profile_image_url: string;

  @Column()
  phone_no!: string;

  @Column({ default: false })
  is_biz: boolean;

  @Column()
  joined_at: Date;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
