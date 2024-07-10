import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/modules/user/user.entity';

import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOneById(id: number): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOneBy({ id });

    return user;
  }

  async findOneByUid(uid: string): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOneBy({ uid });

    return user;
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update({ id: userId }, updateUserDto);

    return await this.userRepository.findOneBy({ id: userId });
  }

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async remove(userId: number) {
    return await this.userRepository.delete(userId);
  }
}
