import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ChatRoomEntity } from './chat_room.entity';
import { UserEntity } from '../user/user.entity';
import { ChatService } from '../chat/chat.service';
import { getUnreadMessagesCount } from '../chat/utils';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoomEntity)
    private readonly chatRoomRepository: Repository<ChatRoomEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly chatService: ChatService,
  ) {}

  async createChatRoom(
    creatorId: number,
    recipientId: number,
  ): Promise<ChatRoomEntity> {
    const creator = await this.userRepository.findOneBy({
      id: creatorId,
    });

    const recipient = await this.userRepository.findOneBy({
      id: recipientId,
    });

    const chatRoom = this.chatRoomRepository.create({
      creator,
      recipient,
    });

    await this.chatRoomRepository.save(chatRoom);
    return chatRoom;
  }

  async deleteChatRoom(roomId: string): Promise<void> {
    await this.chatRoomRepository.delete(roomId);
  }

  async getChatRoom(roomId: string): Promise<ChatRoomEntity> {
    return this.chatRoomRepository.findOne({
      where: { id: Number(roomId) },
      relations: ['creator', 'recipient'],
    });
  }

  async getChatRoomsForUser(userId: number): Promise<ChatRoomEntity[]> {
    const chatRooms = await this.chatRoomRepository
      .createQueryBuilder('chatroom')
      .where('chatroom.creator = :userId OR chatroom.recipient = :userId', {
        userId,
      })
      .leftJoinAndSelect('chatroom.creator', 'creator')
      .leftJoinAndSelect('chatroom.recipient', 'recipient')
      .getMany();

    const chatRoomsWithLastMessages = await Promise.all(
      chatRooms.map(async (room) => {
        try {
          const messages = await this.chatService.getMessages(`${room.id}`);

          const unreadMessagesCount = getUnreadMessagesCount(messages, userId);

          room.unreadMessagesCount = unreadMessagesCount?.[room.id] || 0;

          const lastMessageData = await this.chatService.getLastMessageForRoom(
            room.id,
          );

          if (lastMessageData) {
            room.lastMessage = lastMessageData.text;
            room.lastMessageTime = new Date(lastMessageData.timestamp * 1000);
          }

          return room;
        } catch (error) {
          console.error(error);
          return room;
        }
      }),
    );

    return chatRoomsWithLastMessages;
  }
}
