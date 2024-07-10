import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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

  async findOne(id: number): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async findOneByUid(uid: string): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOneBy({ uid });

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    }

    await this.userRepository.update({ id: userId }, updateUserDto);

    return await this.userRepository.findOneBy({ id: userId });
  }

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async remove(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    }

    return await this.userRepository.delete(userId);
  }
}
