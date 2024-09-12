import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PostEntity } from '../post/post.entity';
import { CommentEntity } from '../comment/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PostEntity, CommentEntity])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
