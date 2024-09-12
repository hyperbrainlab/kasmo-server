import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from 'src/modules/user/user.entity';

import { SignupRequest } from '../auth/dto/signup.dto';

import { UpdateUserRequest } from './dto/update.user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.deletedAt) {
      throw new BadRequestException('User already deactivated');
    }

    const comments = await this.commentRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (comments.length > 0) {
      await Promise.all([
        this.commentRepository.delete({
          id: In(comments.map((comment) => comment.id)),
        }),
      ]);
    }

    const posts = await this.postRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (posts.length > 0) {
      await Promise.all([
        this.postRepository.delete({
          id: In(posts.map((post) => post.id)),
        }),
      ]);
    }

    await this.userRepository.softDelete(userId);
  }

  async restoreUser(userId: number) {
    await this.userRepository.restore(userId);
  }
}
