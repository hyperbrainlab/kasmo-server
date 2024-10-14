import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ChatRoomEntity } from './chat_room.entity';
import { UserEntity } from '../user/user.entity';
import { ChatService } from '../chat/chat.service';

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

  async getChatRoomsForUser(
    userId: number,
    search?: string,
  ): Promise<ChatRoomEntity[]> {
    const chatRooms = await this.chatRoomRepository
      .createQueryBuilder('chatroom')
      .where('chatroom.creator = :userId OR chatroom.recipient = :userId', {
        userId,
      })
      .leftJoinAndSelect('chatroom.creator', 'creator')
      .leftJoinAndSelect('chatroom.recipient', 'recipient')
      .getMany();

    const chatRoomsWithDetails = await Promise.all(
      chatRooms.map((room) => this.enrichChatRoomWithDetails(room, userId)),
    );

    chatRoomsWithDetails.sort((a, b) => {
      const timeA = a.lastMessageTime ? a.lastMessageTime.getTime() : 0;
      const timeB = b.lastMessageTime ? b.lastMessageTime.getTime() : 0;
      return timeB - timeA;
    });

    if (!search) {
      return chatRoomsWithDetails;
    }

    const searchLower = search.toLowerCase().trim();
    return this.filterChatRoomsBySearch(chatRoomsWithDetails, searchLower);
  }

  private async enrichChatRoomWithDetails(
    room: ChatRoomEntity,
    userId: number,
  ): Promise<ChatRoomEntity> {
    try {
      const lastMessageData = await this.chatService.getLastMessageForRoom(
        room.id,
      );
      if (lastMessageData) {
        room.lastMessage = lastMessageData.text;
        room.lastMessageTime = new Date(lastMessageData.timestamp);
      }
      room.unreadMessagesCount = await this.chatService.getUnreadMessagesCount(
        room.id,
        userId,
      );
      return room;
    } catch (error) {
      console.error(`Error processing chat room ${room.id}:`, error);
      return room;
    }
  }

  private filterChatRoomsBySearch(
    rooms: ChatRoomEntity[],
    searchLower: string,
  ): ChatRoomEntity[] {
    return rooms.filter((room) => {
      const creatorName = room.creator?.name?.toLowerCase() || '';
      const recipientName = room.recipient?.name?.toLowerCase() || '';
      const lastMessage = room.lastMessage?.toLowerCase() || '';

      const isCreatorName = creatorName.includes(searchLower);
      const isRecipientName = recipientName.includes(searchLower);
      const isLastMessage = lastMessage.includes(searchLower);

      if (isCreatorName || isRecipientName || isLastMessage) {
        room.searchText = (
          isCreatorName
            ? creatorName
            : isRecipientName
              ? recipientName
              : lastMessage
        ).trim();
        return true;
      }
      return false;
    });
  }
}
