import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Request,
  HttpCode,
  HttpStatus,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';

import { NotificationService } from './notification.service';
import { NotificationResponse } from './dto/retrieve.notification.dto';
import { UpdateNotificationRequest } from './dto/update.notification.dto';
import { SendNotificationMulticastRequest } from './dto/send.notification.dto';

import { FcmService } from '../firebase/fcm.service';

@Controller('notification')
export class NotificationController {
  constructor(
    private notificationService: NotificationService,
    private readonly fcmService: FcmService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '알림 설정 조회' })
  @ApiTags('notification')
  @ApiResponse({ status: 200, type: NotificationResponse })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('')
  async getNotification(@Request() req) {
    try {
      const userId = req.user.id;

      return await this.notificationService.getNotification(userId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '알림 설정 업데이트' })
  @ApiTags('notification')
  @ApiResponse({ status: 200 })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Patch('')
  async updateNotification(
    @Request() req,
    @Body() updateNotificationRequest: UpdateNotificationRequest,
  ) {
    try {
      const userId = req.user.id;

      return await this.notificationService.updateNotification(
        userId,
        updateNotificationRequest,
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Post('all')
  async sendNotificationMulticast(
    @Body()
    sendNotificationMulticastRequest: Omit<
      SendNotificationMulticastRequest,
      'tokens'
    >,
  ) {
    try {
      return await this.notificationService.sendNotificationMulticast(
        sendNotificationMulticastRequest,
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
