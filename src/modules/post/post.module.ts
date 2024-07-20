import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostEntity } from './post.entity';

import { CommentModule } from '../comment/comment.module';

import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  imports: [CommentModule, TypeOrmModule.forFeature([PostEntity])],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}
