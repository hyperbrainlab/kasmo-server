import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

import { FirebaseService } from '../firebase/firebase.service';
import { UserEntity } from '../user/user.entity';
import { ChatRoomEntity } from '../chat_room/chat_room.entity';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ChatRoomEntity])],
  providers: [ChatService, FirebaseService, ChatGateway],
  controllers: [ChatController],
  exports: [ChatService, FirebaseService],
})
export class ChatModule {}
