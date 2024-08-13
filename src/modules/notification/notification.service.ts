import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from './notification.entity';
import { UpdateNotificationRequest } from './dto/update.notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
  ) {}

  async getNotification(id: number) {
    return await this.notificationRepository.findOne({
      where: { user: { id } },
    });
  }

  async updateNotification(
    id: number,
    updateNotificationRequest: UpdateNotificationRequest,
  ) {
    await this.notificationRepository.update(id, updateNotificationRequest);
  }
}
