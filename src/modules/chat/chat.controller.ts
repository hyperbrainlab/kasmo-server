import {
  Controller,
  Post,
  Get,
  Request,
  Param,
  Body,
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
import { ChatService } from './chat.service';
import { CreateChatRequest } from './dto/create.chat.dto';
import { Message } from './dto/retrieve.chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '채팅 메시지 전송' })
  @ApiTags('chat')
  @ApiResponse({ status: 200 })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('room/:roomId/message')
  async sendMessage(
    @Param('roomId') roomId: number,
    @Body() createChatRequest: CreateChatRequest,
    @Request() req,
  ): Promise<void> {
    try {
      const senderId = req.user.id;

      await this.chatService.sendMessage({
        roomId,
        senderId: Number(senderId),
        message: createChatRequest.message,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '채팅 메시지 목록 조회' })
  @ApiTags('chat')
  @ApiResponse({ status: 200, type: [Message] })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('room/:roomId/message')
  async getMessages(@Param('roomId') roomId: string) {
    try {
      return await this.chatService.getMessages(roomId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
