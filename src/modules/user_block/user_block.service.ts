import { UserBlockEntity } from './user_block.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Status } from './constants';

@Injectable()
export class UserBlockService {
  constructor(
    private userService: UserService,
    @InjectRepository(UserBlockEntity)
    private readonly userBlockRepository: Repository<UserBlockEntity>,
  ) {}

  async block({
    blockerUserId,
    blockedUserId,
  }: {
    blockerUserId: number;
    blockedUserId: number;
  }) {
    const blocker = await this.userService.findOneById(blockerUserId);
    const blocked = await this.userService.findOneById(blockedUserId);

    if (!blocker) {
      throw new NotFoundException('Blocker user not found');
    }

    if (!blocked) {
      throw new NotFoundException('Blocked user not found');
    }

    return await this.userBlockRepository.save({
      blocker,
      blocked,
      status: Status.APPROVED, // 신고 처리 절차를 생략하고 바로 승인 상태로 처리
    });
  }
}
