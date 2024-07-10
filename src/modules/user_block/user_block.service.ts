import { UserBlockEntity } from './user_block.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class UserBlockService {
  constructor(
    private userService: UserService,
    @InjectRepository(UserBlockEntity)
    private readonly userBlockRepository: Repository<UserBlockEntity>,
  ) {}

  async block({
    blocker_id,
    blocked_id,
  }: {
    blocker_id: number;
    blocked_id: number;
  }) {
    const blocker = await this.userService.findOneById(blocker_id);
    const blocked = await this.userService.findOneById(blocked_id);

    if (!blocker) {
      throw new NotFoundException('Blocker user not found');
    }

    if (!blocked) {
      throw new NotFoundException('Blocked user not found');
    }

    return await this.userBlockRepository.save({
      blocker_id,
      blocked_id,
      status: 'APPROVED', // 신고 처리 절차를 생략하고 바로 승인 상태로 처리
    });
  }
}
