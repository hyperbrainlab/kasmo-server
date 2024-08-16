import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { chunkArray } from 'src/utils/helper';
import {
  SendNotificationMulticastRequest,
  SendNotificationRequest,
} from '../notification/dto/send.notification.dto';

@Injectable()
export class FcmService {
  async sendNotification({
    token,
    title,
    body,
    data,
  }: SendNotificationRequest) {
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

  async sendNotificationToMultiple({
    tokens,
    title,
    body,
    data,
  }: SendNotificationMulticastRequest) {
    const message: admin.messaging.MulticastMessage = {
      notification: {
        title,
        body,
      },
      tokens,
      data,
    };

    const chunkedTokens = chunkArray(tokens, 500);

    const responses: admin.messaging.BatchResponse[] = [];

    try {
      for (const chunk of chunkedTokens) {
        message.tokens = chunk;
        const response = await admin.messaging().sendEachForMulticast(message);
        responses.push(response);
      }
      return responses;
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}
