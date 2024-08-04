import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentEntity } from './comment.entity';
import { CreateCommentRequest } from './dto/create.comment.dto';
import { UpdateCommentRequest } from './dto/update.comment.dto';
import { CommentResponse } from './dto/retrieve.comment.dto';
import { PostEntity } from '../post/post.entity';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,

    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll({ postId }: { postId: number }) {
    const comments = await this.commentRepository.find({
      where: {
        post: { id: postId },
      },
      relations: ['post', 'user'],
    });

    return comments;
  }

  async create(
    createCommentRequest: CreateCommentRequest & { userId: number },
  ): Promise<CommentResponse> {
    const { parentCommentId, postId, userId, ...rest } = createCommentRequest;

    let parentComment, post;

    if (parentCommentId) {
      parentComment = await this.commentRepository.findOneBy({
        id: Number(parentCommentId),
      });
    }

    if (postId) {
      post = await this.postRepository.findOneBy({ id: Number(postId) });
    }

    const user = await this.userRepository.findOneBy({
      id: Number(userId),
    });

    const comment = await this.commentRepository.create({
      post,
      parentComment,
      user,
      ...rest,
    });

    await this.commentRepository.save(comment);

    return await this.commentRepository.findOneBy({ id: comment.id });
  }

  async update(
    commentId: number,
    updateCommentRequest: UpdateCommentRequest,
  ): Promise<CommentResponse> {
    await this.commentRepository.update(
      { id: commentId },
      updateCommentRequest,
    );

    return await this.commentRepository.findOneBy({ id: commentId });
  }

  async delete(commentId: number) {
    return await this.commentRepository.delete(commentId);
  }
}
