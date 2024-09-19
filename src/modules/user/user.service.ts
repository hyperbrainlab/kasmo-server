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
    await this.userRepository.update({ id: userId }, updateUserRequest);

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
