import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentEntity } from './comment.entity';
import { CreateCommentRequest } from './dto/create.comment.dto';
import { UpdateCommentRequest } from './dto/update.comment.dto';
import { CommentResponse } from './dto/retrieve.comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async findAll({ postId }: { postId: number }) {
    const comments = await this.commentRepository.find({
      where: {
        post: { id: postId },
      },
      relations: ['post'],
    });

    return comments;
  }

  async create(
    createCommentRequest: CreateCommentRequest,
  ): Promise<CommentResponse> {
    const comment = await this.commentRepository.save(createCommentRequest);

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
