import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentEntity } from './comment.entity';
import { CommentService } from './comment.service';
import { PostEntity } from '../post/post.entity';
import { UserEntity } from '../user/user.entity';
import { FcmModule } from '../firebase/fcm.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, PostEntity, UserEntity]),
    FcmModule,
  ],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
