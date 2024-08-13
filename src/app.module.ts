import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ReportModule } from './modules/report/report.module';
import { UserBlockModule } from './modules/user_block/user_block.module';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { ChatModule } from './modules/chat/chat.module';
import { ChatRoomModule } from './modules/chat_room/chat_room.module';
import { BizDirectoryModule } from './modules/biz_directory/biz_directory.module';
import { BannerModule } from './modules/banner/banner.module';
import { NotificationModule } from './modules/notification/notification.module';

import { ChatGateway } from './modules/chat/chat.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    ReportModule,
    UserBlockModule,
    PostModule,
    CommentModule,
    ChatModule,
    ChatRoomModule,
    BizDirectoryModule,
    BannerModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
