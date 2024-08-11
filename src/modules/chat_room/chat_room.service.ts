import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoomEntity } from './chat_room.entity';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoomEntity)
    private readonly chatRoomRepository: Repository<ChatRoomEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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
    return this.chatRoomRepository
      .createQueryBuilder('chatroom')
      .where('chatroom.creator = :userId OR chatroom.recipient = :userId', {
        userId,
      })
      .leftJoinAndSelect('chatroom.creator', 'creator')
      .leftJoinAndSelect('chatroom.recipient', 'recipient')
      .getMany();
  }
}
