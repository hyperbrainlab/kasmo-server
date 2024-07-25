import { PostEntity } from './post.entity';
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { CreatePostRequest } from './dto/create.post.dto';
import { UpdatePostRequest } from './dto/update.post.dto';
import { PaginationResponse } from '../common/dto/pagination.response.dto';
import { PostsRequest } from './dto/retrieve.post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async paginate({
    category,
    keyword,
    order,
    page = 1,
    size = 10,
  }: PostsRequest): Promise<PaginationResponse<PostEntity[]>> {
    const offset = (page - 1) * size;

    const [posts, total] = await this.postRepository.findAndCount({
      where: {
        category,
        title: keyword ? Like(`%${keyword}%`) : undefined,
        user: {
          name: keyword ? Like(`%${keyword}%`) : undefined,
        },
      },
      order:
        order === 'popular' ? { viewCount: 'DESC' } : { createdAt: 'DESC' },
      // skip: 10,
      // take: size,
    });

    return {
      data: posts,
      page: 1,
      total,
      size,
    };
  }

  async findOneById(postId: number): Promise<PostEntity | undefined> {
    return await this.postRepository.findOneBy({ id: postId });
  }

  async addViewCount(postId: number) {
    const post = await this.postRepository.findOneBy({ id: postId });

    if (!post) {
      throw new Error(`Post with id ${postId} not found`);
    }

    return await this.postRepository.increment({ id: postId }, 'viewCount', 1);
  }

  async create(createPostRequest: CreatePostRequest) {
    return await this.postRepository.save(createPostRequest);
  }

  async update(commentId: number, updatePostRequest: UpdatePostRequest) {
    await this.postRepository.update({ id: commentId }, updatePostRequest);

    return await this.postRepository.findOneBy({ id: commentId });
  }

  async delete(postId: number) {
    return await this.postRepository.delete(postId);
  }
}
