import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomEntity } from './chat_room.entity';

import { UserEntity } from '../user/user.entity';
import { ChatRoomService } from './chat_room.service';
import { ChatRoomController } from './chat_room.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoomEntity, UserEntity])],
  providers: [ChatRoomService],
  controllers: [ChatRoomController],
  exports: [ChatRoomService],
})
export class ChatRoomModule {}
