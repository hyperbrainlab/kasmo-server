import { PostEntity } from './post.entity';
import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { parse } from 'csv-parse';
import {
  FilterOperator,
  PaginateQuery,
  paginate,
  Paginated,
} from 'nestjs-paginate';

import { CreatePostRequest } from './dto/create.post.dto';
import { UpdatePostRequest } from './dto/update.post.dto';
import { UserEntity } from '../user/user.entity';
import { ReplyPostRequest } from './dto/reply.post.dto';
import { FcmService } from '../firebase/fcm.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly fcmService: FcmService,
    private readonly notificationService: NotificationService,
  ) {}

  async bulkDelete(ids: number[]): Promise<void> {
    await this.postRepository.delete(ids);
  }

  async processCsvFile(
    fileBuffer: Buffer,
  ): Promise<{ processed: number; failed: number }> {
    return new Promise((resolve, reject) => {
      const results: (CreatePostRequest & { userId: number })[] = [];
      let processed = 0;
      let failed = 0;

      parse(fileBuffer, {
        columns: true,
        skip_empty_lines: true,
      })
        .on('data', (data) => {
          results.push(data);
        })
        .on('error', (error) => {
          reject(
            new BadRequestException(
              'CSV 파싱 중 오류가 발생했습니다: ' + error.message,
            ),
          );
        })
        .on('end', async () => {
          for (const row of results) {
            try {
              await this.create(row);
              processed++;
            } catch (error) {
              console.error('데이터 처리 중 오류:', error);
              failed++;
            }
          }
          resolve({ processed, failed });
        });
    });
  }

  async getCommentCountForPost(postId: number): Promise<number> {
    const count = await this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.comments', 'comments')
      .where('post.id = :postId', { postId })
      .select('COUNT(comments.id)', 'count')
      .getRawOne();

    return parseInt(count.count, 10);
  }

  async getRelationsByPostId(postId: number): Promise<PostEntity> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: [
        'user',
        'comments',
        'parentPost',
        'childPosts',
        'childPosts.user',
      ],
    });

    if (!post) {
      return null;
    }

    return post;
  }

  async findAll(query: PaginateQuery): Promise<Paginated<PostEntity>> {
    // const queryBuilder = this.postRepository
    //   .createQueryBuilder('post')
    //   .leftJoinAndSelect('post.user', 'user');

    // .orderBy('post.createdAt', 'DESC')
    // .addSelect([
    //   'post.title',
    //   'post.body',
    //   'post.category',
    //   'post.subCategory',
    // ]);

    const paginatedPosts = await paginate<PostEntity>(
      query,
      this.postRepository,
      {
        sortableColumns: ['createdAt', 'viewCount'],
        nullSort: 'last',
        defaultSortBy: [['createdAt', 'DESC']],
        searchableColumns: ['title', 'body', 'category', 'subCategory'],
        filterableColumns: {
          title: [FilterOperator.EQ, FilterOperator.IN],
          body: [FilterOperator.EQ, FilterOperator.IN],
          category: [FilterOperator.EQ],
          subCategory: [FilterOperator.EQ],
        },
        // relations: ['user'],
      },
    );

    const postsWithRelations = await Promise.all(
      paginatedPosts.data.map(async (post) => {
        const { user, parentPost, childPosts } =
          await this.getRelationsByPostId(post.id);
        const commentsCount = await this.getCommentCountForPost(post.id);

        return {
          ...post,
          parentPost,
          childPosts,
          commentsCount,
          user,
        };
      }),
    );

    return {
      data: postsWithRelations,
      meta: paginatedPosts.meta,
      links: paginatedPosts.links,
    };
  }

  async findOneById(postId: number): Promise<PostEntity | undefined> {
    return await this.postRepository.findOne({
      where: { id: postId },
      relations: ['user', 'parentPost', 'childPosts'],
    });
  }

  async addViewCount(postId: number) {
    const post = await this.postRepository.findOneBy({ id: postId });

    if (!post) {
      throw new Error(`Post with id ${postId} not found`);
    }

    return await this.postRepository.increment({ id: postId }, 'viewCount', 1);
  }

  async create(createPostRequest: CreatePostRequest & { userId: number }) {
    const user = await this.userRepository.findOneBy({
      id: createPostRequest.userId,
    });

    const post = await this.postRepository.create({
      ...createPostRequest,
      user,
    });

    return await this.postRepository.save(post);
  }

  async reply(replyPostRequest: ReplyPostRequest & { userId: number }) {
    const user = await this.userRepository.findOneBy({
      id: replyPostRequest.userId,
    });

    const parentPost = await this.postRepository.findOne({
      where: { id: replyPostRequest.parentPostId },
      relations: ['user', 'user.notification'],
    });

    if (!parentPost) {
      throw new Error(
        `Parent post with id ${replyPostRequest.parentPostId} not found`,
      );
    }

    const post = await this.postRepository.create({
      ...replyPostRequest,
      category: parentPost.category,
      subCategory: parentPost.subCategory,
      user,
      parentPost,
    });

    const notification = await this.notificationService.getNotification(
      parentPost.user.id,
    );

    if (!!notification?.postCommentNotification) {
      this.fcmService.sendNotification({
        token: parentPost.user.fcmToken,
        title: '답글',
        body: `${user.name} 님이 당신의 답글을 달았습니다.`,
        data: {
          postId: post.id,
        },
      });
    }

    return await this.postRepository.save(post);
  }

  async update(commentId: number, updatePostRequest: UpdatePostRequest) {
    await this.postRepository.update({ id: commentId }, updatePostRequest);

    return await this.postRepository.findOneBy({ id: commentId });
  }

  async delete(postId: number) {
    return await this.postRepository.delete(postId);
  }

  async toggleIsAdvertise(postId: number, isAdvertise: boolean) {
    return await this.postRepository.update({ id: postId }, { isAdvertise });
  }
}
