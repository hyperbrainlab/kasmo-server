import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

import { FirebaseService } from '../firebase/firebase.service';
import { ChatRoomEntity } from '../chat_room/chat_room.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChatService {
  private db: admin.database.Database;

  constructor(
    private firebaseService: FirebaseService,
    @InjectRepository(ChatRoomEntity)
    private readonly chatRoomRepository: Repository<ChatRoomEntity>,
  ) {
    this.db = this.firebaseService.getDatabase();
  }

  async sendMessage({
    roomId,
    senderId,
    message,
  }: {
    roomId: number;
    senderId: number;
    message: string;
  }): Promise<void> {
    const chatRoom = await this.chatRoomRepository.findOne({
      where: { id: roomId },
      relations: ['creator', 'recipient'],
    });

    const recipientId = chatRoom.recipient.id;

    await this.db.ref(`chatrooms/${roomId}/messages`).push({
      text: message,
      timestamp: Date.now(),
      senderId,
      readyBy: {
        [senderId]: true,
        [recipientId]: false,
      },
    });
  }

  async getMessages(roomId: string): Promise<any[]> {
    const snapshot = await this.db
      .ref(`chatrooms/${roomId}/messages`)
      .once('value');
    const messages = snapshot.val();
    return messages ? Object.values(messages) : [];
  }
}
