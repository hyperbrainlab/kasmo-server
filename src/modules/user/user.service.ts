import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from 'src/modules/user/user.entity';

import { SignupRequest } from '../auth/dto/signup.dto';

import { UpdateUserRequest } from './dto/update.user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { PostEntity } from '../post/post.entity';
import { CommentEntity } from '../comment/comment.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private dataSource: DataSource,
  ) {}

  async findUsers() {
    return await this.userRepository.find();
  }

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

    const visitsCount = user.posts.reduce((acc, post) => {
      return acc + post.viewCount;
    }, 0);

    return {
      ...user,
      visitsCount,
      postsCount: user.posts.length,
      commentsCount: user.comments.length,
    };
  }

  async findOneByUserId(userId: string) {
    return await this.userRepository.findOneBy({ userId });
  }

  async findOneById(userId: number): Promise<UserEntity | undefined> {
    return await this.userRepository.findOneBy({ id: userId });
  }

  async findOneByUid(uid: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({
      where: { uid },
      withDeleted: true,
    });
  }

  async update(userId: number, updateUserRequest: UpdateUserRequest) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    let nameChangedAt = undefined;

    if ('name' in updateUserRequest && updateUserRequest.name !== user.name) {
      const currentDate = new Date();
      const thirtyDaysAgo = new Date(
        currentDate.getTime() - 30 * 24 * 60 * 60 * 1000,
      );

      if (user.nameChangedAt && user.nameChangedAt > thirtyDaysAgo) {
        const daysLeft = Math.ceil(
          (user.nameChangedAt.getTime() - thirtyDaysAgo.getTime()) /
            (1000 * 60 * 60 * 24),
        );
        throw new BadRequestException(
          `닉네임 변경은 30일에 한 번만 가능합니다. ${daysLeft}일 후에 다시 시도해주세요.`,
        );
      }

      nameChangedAt = currentDate;
    }

    // 모든 경우에 대해 업데이트 수행
    await this.userRepository.update(
      { id: userId },
      {
        ...updateUserRequest,
        ...(nameChangedAt && { nameChangedAt }),
      },
    );

    return await this.userRepository.findOneBy({ id: userId });
  }

  async updateName(userId: number, name: string) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const currentDate = new Date();
    const thirtyDaysAgo = new Date(
      currentDate.getTime() - 30 * 24 * 60 * 60 * 1000,
    );

    if (user.nameChangedAt && user.nameChangedAt > thirtyDaysAgo) {
      const daysLeft = Math.ceil(
        (user.nameChangedAt.getTime() - thirtyDaysAgo.getTime()) /
          (1000 * 60 * 60 * 24),
      );
      throw new BadRequestException(
        `닉네임 변경은 30일에 한 번만 가능합니다. ${daysLeft}일 후에 다시 시도해주세요.`,
      );
    }

    await this.userRepository.update(
      { id: userId },
      {
        name,
        nameChangedAt: currentDate,
      },
    );

    return await this.userRepository.findOneBy({ id: userId });
  }

  async updateCompany(userId: number, companyId: number) {
    await this.userRepository.update({ id: userId }, {});
  }

  async updateFcmToken(
    userId: number,
    fcmToken: string,
  ): Promise<UserEntity | undefined> {
    await this.userRepository.update({ id: userId }, { fcmToken });

    return await this.userRepository.findOneBy({ id: userId });
  }

  async create(signupRequest: SignupRequest) {
    return await this.userRepository.save(signupRequest);
  }

  async inactivate(userId: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.userRepository.findOneBy({ id: userId });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (user.deletedAt) {
        throw new BadRequestException('User already deactivated');
      }

      await this.userRepository.softDelete(userId);

      await queryRunner.manager.delete('comment', { user: { id: userId } });
      await queryRunner.manager.delete('post', { user: { id: userId } });
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async restoreUser(userId: number) {
    await this.userRepository.restore(userId);
  }
}
