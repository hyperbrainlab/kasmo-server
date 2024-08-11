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

  async findUser(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [
        'posts',
        'comments',
        'blocksMade',
        'blocksReceived',
        'reportsMade',
        'reportsReceived',
      ],
    });

    return {
      ...user,
      // TODO:: 방문자 수 추가
      visitsCount: 0,
      postsCount: user.posts.length,
      commentsCount: user.comments.length,
    };
  }

  async findOneById(userId: number): Promise<UserEntity | undefined> {
    return await this.userRepository.findOneBy({ id: userId });
  }

  async findOneByUid(uid: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOneBy({ uid });
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
