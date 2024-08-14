import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

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
    userId: number,
    updateNotificationRequest: UpdateNotificationRequest,
  ) {
    const notification = await this.notificationRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!notification) {
      await this.createNotification(userId, {
        chatNotification: true,
        postCommentNotification: true,
        replyCommentNotification: true,
        announcementNotification: true,
      });

      return this.notificationRepository.findOne({
        where: { user: { id: userId } },
      });
    } else {
      const transformedRequest = plainToClass(
        UpdateNotificationRequest,
        updateNotificationRequest,
      );

      await this.notificationRepository.update(
        notification.id,
        transformedRequest,
      );

      return await this.notificationRepository.findOneBy({
        id: notification.id,
      });
    }
  }
}
