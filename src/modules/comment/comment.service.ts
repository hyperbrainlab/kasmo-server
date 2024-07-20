import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from '../user/user.service';
import { PostService } from '../post/post.service';

import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    private userService: UserService,
    private postService: PostService,
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async findAll() {}

  async create() {}

  async update() {}

  async delete() {}
}
