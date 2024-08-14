import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FcmService {
  async sendNotification(
    token: string,
    title: string,
    body: string,
    data?: any,
  ) {
    const message = {
      notification: {
        title,
        body,
      },
      data,
      token,
    };

    try {
      const response = await admin.messaging().send(message);
      console.log('Successfully sent message:', response);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  // async sendNotificationToMultipleUsers(
  //   userIds: string[],
  //   title: string,
  //   body: string,
  //   data?: any,
  // ) {
  //   // 다수의 유저 데이터를 한번에 조회
  //   const users = await this.usersRepository.findManyByIds(userIds);

  //   // 알림이 활성화된 유저들만 필터링
  //   const tokens = users
  //     .filter((user) => user.notificationsEnabled && user.fcmToken)
  //     .map((user) => user.fcmToken);

  //   if (tokens.length === 0) {
  //     console.log('No users to send notifications to.');
  //     return;
  //   }

  //   const message = {
  //     notification: {
  //       title,
  //       body,
  //     },
  //     data,
  //     tokens,
  //   };

  //   try {
  //     // 다수의 유저에게 메시지 전송
  //     const response = await admin.messaging().sendMulticast(message);
  //     console.log('Successfully sent messages:', response);
  //   } catch (error) {
  //     console.error('Error sending messages:', error);
  //   }
  // }
}
