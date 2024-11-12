import { Injectable, NotFoundException } from '@nestjs/common';

import { FirebaseService } from '../firebase/firebase.service';
import { ChatRoomEntity } from '../chat_room/chat_room.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './dto/retrieve.chat.dto';
import { FcmService } from '../firebase/fcm.service';
import { UserEntity } from '../user/user.entity';

import { NotificationService } from '../notification/notification.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRoomEntity)
    private readonly chatRoomRepository: Repository<ChatRoomEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly notificationService: NotificationService,
    private readonly fcmService: FcmService,
    private readonly firebaseService: FirebaseService,
  ) {}

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

    const sender = await this.userRepository.findOneBy({
      id: senderId,
    });

    const recipient = chatRoom.recipient;
    const creator = chatRoom.creator;

    if (!sender) {
      throw new NotFoundException('Sender not found');
    }

    if (!chatRoom.recipient) {
      throw new NotFoundException('Recipient not found');
    }

    await this.firebaseService
      .getDatabase()
      .ref(`chatrooms/${roomId}/messages`)
      .push({
        text: message,
        timestamp: Date.now(),
        senderId,
        readyBy: {
          [senderId]: true,
          [recipient.id]: false,
        },
      });

    const opposite = senderId === recipient.id ? creator : recipient;

    const notification = await this.notificationService.getNotification(
      opposite.id,
    );

    if (!!notification?.chatNotification) {
      await this.fcmService.sendNotification({
        token: opposite.fcmToken,
        title: '채팅',
        body: `${sender.name} 님이 채팅을 보냈습니다.`,
        data: {
          chatRoomId: `${chatRoom.id}`,
          type: 'chat',
        },
      });
    }
  }

  async getMessages(roomId: string): Promise<Message[]> {
    const snapshot = await this.firebaseService
      .getDatabase()
      .ref(`chatrooms/${roomId}/messages`)
      .once('value');
    const messages = snapshot.val();
    return messages ? Object.values(messages) : [];
  }

  async getLastMessageForRoom(roomId: number): Promise<Message | null> {
    const messagesRef = this.firebaseService
      .getDatabase()
      .ref(`chatrooms/${roomId}/messages`);

    const snapshot = await messagesRef
      .orderByKey()
      .limitToLast(1)
      .once('value');

    const lastMessage = snapshot.val();

    if (lastMessage) {
      const key = Object.keys(lastMessage)[0];
      return {
        key,
        ...lastMessage[key],
      };
    } else {
      return null;
    }
  }

  async getUnreadMessagesCount(
    roomId: number,
    userId: number,
  ): Promise<number> {
    const messagesRef = this.firebaseService
      .getDatabase()
      .ref(`chatrooms/${roomId}/messages`);

    const snapshot = await messagesRef
      .orderByChild(`readBy/${userId}`)
      .equalTo(false)
      .once('value');

    const unreadMessages = snapshot.val();

    return unreadMessages ? Object.keys(unreadMessages).length : 0;
  }
}
