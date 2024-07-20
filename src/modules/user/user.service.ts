import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/modules/user/user.entity';

import { SignupRequest } from '../auth/dto/signup.dto';

import { UpdateUserRequest } from './dto/update.user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOneById(userId: number): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOneBy({ id: userId });

    return user;
  }

  async findOneByUid(uid: string): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOneBy({ uid });

    return user;
  }

  async update(userId: number, updateUserRequest: UpdateUserRequest) {
    await this.userRepository.update({ id: userId }, updateUserRequest);

    return await this.userRepository.findOneBy({ id: userId });
  }

  async create(signupRequest: SignupRequest) {
    return await this.userRepository.save(signupRequest);
  }

  async delete(userId: number) {
    return await this.userRepository.delete(userId);
  }
}
