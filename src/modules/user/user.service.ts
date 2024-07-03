import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/modules/user/user.entity';

@Injectable()
export class UserService {
  private readonly users: UserEntity[] = [
    {
      id: 1,
      user_id: '1',
      name: 'john',
      password_hash: 'changeme',
      phone_no: '1234567890',
      created_at: new Date(),
      updated_at: new Date(),
      is_biz: false,
      profile_image_url: 'https://example.com/image.jpg',
      joined_at: new Date(),
    },
    {
      id: 2,
      user_id: '2',
      name: 'Kay',
      password_hash: 'changeme',
      phone_no: '1234567890',
      created_at: new Date(),
      updated_at: new Date(),
      is_biz: false,
      profile_image_url: 'https://example.com/image.jpg',
      joined_at: new Date(),
    },
  ];

  async findOne(user_id: string): Promise<UserEntity | undefined> {
    return this.users.find((user) => user.user_id === user_id);
  }
}
