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

    const existingBlock = await this.userBlockRepository.findOne({
      where: { blocker: { id: blockerUserId }, blocked: { id: blockedUserId } },
    });

    if (existingBlock) {
      if (existingBlock.status === Status.APPROVED) {
        return existingBlock; // 이미 차단된 상태
      }
      existingBlock.status = Status.APPROVED;
      return await this.userBlockRepository.save(existingBlock);
    }

    return await this.userBlockRepository.save({
      blocker,
      blocked,
      status: Status.APPROVED,
    });
  }

  async unblock({
    blockerUserId,
    blockedUserId,
  }: {
    blockerUserId: number;
    blockedUserId: number;
  }) {
    const existingBlock = await this.userBlockRepository.findOne({
      where: { blocker: { id: blockerUserId }, blocked: { id: blockedUserId } },
    });

    if (!existingBlock) {
      throw new NotFoundException('Block not found');
    }

    if (existingBlock.status === Status.REJECTED) {
      return existingBlock;
    }

    existingBlock.status = Status.REJECTED;
    return await this.userBlockRepository.save(existingBlock);
  }

  async getBlockStatus({
    blockerUserId,
    blockedUserId,
  }: {
    blockerUserId: number;
    blockedUserId: number;
  }) {
    const block = await this.userBlockRepository.findOne({
      where: { blocker: { id: blockerUserId }, blocked: { id: blockedUserId } },
    });

    return block ? block.status : null;
  }

  async listBlockedUsers(userId: number) {
    return await this.userBlockRepository.find({
      where: { blocker: { id: userId }, status: Status.APPROVED },
      relations: ['blocked'],
    });
  }
}
