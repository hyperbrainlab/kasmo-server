import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Request,
  Param,
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
import { ChatRoomService } from './chat_room.service';
import { ChatRoomEntity } from './chat_room.entity';
import { DeleteResult } from 'typeorm';
import { ChatRoomResponse } from './dto/retrieve.chat_room.dto';
import { CreateChatRoomRequest } from './dto/create.chat_room.dto';

@Controller('chat')
export class ChatRoomController {
  constructor(private chatRoomService: ChatRoomService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '채팅방 생성' })
  @ApiTags('chat')
  @ApiResponse({ status: 200, type: ChatRoomResponse })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('room')
  async createChatRoom(
    @Request() req,
    @Body() createChatRoomRequest: CreateChatRoomRequest,
  ): Promise<ChatRoomResponse> {
    try {
      const creatorUserId = req.user.id;

      return await this.chatRoomService.createChatRoom(
        creatorUserId,
        Number(createChatRoomRequest.recipientId),
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '채팅방 조회' })
  @ApiTags('chat')
  @ApiResponse({ status: 200, type: ChatRoomResponse })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('room/:roomId')
  async getChatRoom(@Param('roomId') roomId: string): Promise<ChatRoomEntity> {
    try {
      return await this.chatRoomService.getChatRoom(roomId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '채팅방 삭제' })
  @ApiTags('chat')
  @ApiResponse({ status: 200, type: DeleteResult })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('room/:roomId')
  async deleteChatRoom(@Param('roomId') roomId: string): Promise<void> {
    try {
      return await this.chatRoomService.deleteChatRoom(roomId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '채팅방 목록 조회' })
  @ApiTags('chat')
  @ApiResponse({ status: 200, type: [ChatRoomResponse] })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('room')
  async getChatRooms(@Request() req) {
    try {
      const userId = req.user.id;

      return await this.chatRoomService.getChatRoomsForUser(userId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
