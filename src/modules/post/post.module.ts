import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostEntity } from './post.entity';

import { CommentModule } from '../comment/comment.module';

import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UserEntity } from '../user/user.entity';
import { FcmModule } from '../firebase/fcm.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    CommentModule,
    FcmModule,
    NotificationModule,
    TypeOrmModule.forFeature([PostEntity, UserEntity]),
  ],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}
