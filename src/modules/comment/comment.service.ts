import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CreateCommentRequest } from './dto/create.comment.dto';
import { UpdateCommentRequest } from './dto/update.comment.dto';
import { CommentResponse } from './dto/retrieve.comment.dto';
import { PostEntity } from '../post/post.entity';
import { UserEntity } from '../user/user.entity';
import { plainToClass } from 'class-transformer';
import { FcmService } from '../firebase/fcm.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly fcmService: FcmService,
    private readonly notificationService: NotificationService,
  ) {}

  async findAll({ postId }: { postId: number }): Promise<CommentEntity[]> {
    return await this.commentRepository.find({
      where: {
        post: { id: postId },
        parentComment: null,
      },
      relations: [
        'post',
        'user',
        'parentComment',
        'childComments',
        'childComments.user',
      ],
    });
  }

  async create(
    createCommentRequest: CreateCommentRequest & { userId: number },
  ): Promise<CommentResponse> {
    const { parentCommentId, postId, userId, ...rest } = createCommentRequest;

    const [parentComment, post, user] = await Promise.all([
      parentCommentId
        ? this.commentRepository.findOne({ where: { id: parentCommentId } })
        : Promise.resolve(null),
      this.postRepository.findOne({
        where: {
          id: postId,
        },
        relations: ['user', 'user.notification'],
      }),
      this.userRepository.findOneBy({ id: Number(userId) }),
    ]);

    if (!post) throw new NotFoundException(`Post with id ${postId} not found`);
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);

    const comment = this.commentRepository.create({
      post,
      parentComment,
      user,
      ...rest,
    });

    await this.commentRepository.save(comment);

    const savedComment = await this.commentRepository.findOne({
      where: { id: comment.id },
      relations: ['post', 'user', 'parentComment', 'childComments'],
    });

    const notification = await this.notificationService.getNotification(
      post.user.id,
    );

    if (!!notification?.replyCommentNotification) {
      this.fcmService.sendNotification({
        token: post.user.fcmToken,
        title: '댓글',
        body: `${user.name} 님이 댓글을 달았습니다.`,
        data: {
          postId: post.id,
          type: 'comment',
        },
      });
    }

    return this.mapToResponse(savedComment);
  }

  async update(
    commentId: number,
    updateCommentRequest: UpdateCommentRequest,
  ): Promise<CommentResponse> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['post', 'user', 'parentComment', 'childComments'],
    });

    if (!comment)
      throw new NotFoundException(`Comment with id ${commentId} not found`);

    Object.assign(comment, updateCommentRequest);
    await this.commentRepository.save(comment);

    return this.mapToResponse(comment);
  }

  async delete(commentId: number): Promise<void> {
    const result = await this.commentRepository.delete(commentId);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with id ${commentId} not found`);
    }
  }

  private mapToResponse(comment: CommentEntity): CommentResponse {
    return plainToClass(CommentResponse, comment, {
      excludeExtraneousValues: false,
    });
  }
}
