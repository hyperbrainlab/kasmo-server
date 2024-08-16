import { PostEntity } from './post.entity';
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  FilterOperator,
  PaginateQuery,
  paginate,
  Paginated,
} from 'nestjs-paginate';

import { CreatePostRequest } from './dto/create.post.dto';
import { UpdatePostRequest } from './dto/update.post.dto';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

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

    return await paginate<PostEntity>(query, this.postRepository, {
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
      relations: ['user'],
    });
  }

  async findOneById(postId: number): Promise<PostEntity | undefined> {
    return await this.postRepository.findOne({
      where: { id: postId },
      relations: ['user'],
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

  async update(commentId: number, updatePostRequest: UpdatePostRequest) {
    await this.postRepository.update({ id: commentId }, updatePostRequest);

    return await this.postRepository.findOneBy({ id: commentId });
  }

  async delete(postId: number) {
    return await this.postRepository.delete(postId);
  }
}
