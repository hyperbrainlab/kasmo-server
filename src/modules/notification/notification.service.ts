import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from './notification.entity';
import { UpdateNotificationRequest } from './dto/update.notification.dto';
import { CreateNotificationRequest } from './dto/create.notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
  ) {}

  async getNotification(userId: number) {
    const result = await this.notificationRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!result) {
      await this.createNotification(userId, {
        chatNotification: true,
        postCommentNotification: true,
        replyCommentNotification: true,
        announcementNotification: true,
      });
    } else {
      return result;
    }

    return this.notificationRepository.findOne({
      where: { user: { id: userId } },
    });
  }

  async createNotification(
    userId: number,
    createNotificationRequest: CreateNotificationRequest,
  ) {
    await this.notificationRepository.insert({
      user: { id: userId },
      ...createNotificationRequest,
    });
  }

  async updateNotification(
    id: number,
    updateNotificationRequest: UpdateNotificationRequest,
  ) {
    await this.notificationRepository.update(id, updateNotificationRequest);
  }
}
