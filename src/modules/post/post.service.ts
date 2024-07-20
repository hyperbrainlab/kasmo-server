import { PostEntity } from './post.entity';
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from '../user/user.service';
import { CommentService } from '../comment/comment.service';

@Injectable()
export class PostService {
  constructor(
    private commentService: CommentService,
    private userService: UserService,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async findAll() {}

  async create() {}

  async update() {}

  async delete() {}
}
