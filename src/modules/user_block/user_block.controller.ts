import { UserBlockService } from './user_block.service';
import {
  Controller,
  Get,
  Post,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Param,
  InternalServerErrorException,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';
import { UserBlockEntity } from './user_block.entity';

@Controller('block')
export class UserBlockController {
  constructor(private userBlockService: UserBlockService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '블락한 유저 목록 가져오기' })
  @ApiTags('user_block')
  @ApiResponse({ status: 200, type: [UserBlockEntity] })
  @Get('list')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async listBlockedUsers(@Request() req) {
    try {
      const userId = req.user.id;

      return await this.userBlockService.listBlockedUsers(userId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '유저 블락하기' })
  @ApiTags('user_block')
  @ApiResponse({ status: 200 })
  @Post(':blockedUserId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async report(@Request() req, @Param('blockedUserId') blockedUserId: number) {
    try {
      const blockerUserId = req.user.id;

      return await this.userBlockService.block({
        blockerUserId,
        blockedUserId,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '유저 블락 해제하기' })
  @ApiTags('user_block')
  @ApiResponse({ status: 200 })
  @Delete(':blockedUserId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async unblock(@Request() req, @Param('blockedUserId') blockedUserId: number) {
    try {
      const blockerUserId = req.user.id;

      return await this.userBlockService.unblock({
        blockerUserId,
        blockedUserId,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '유저 블락 상태 확인하기' })
  @ApiTags('user_block')
  @ApiResponse({ status: 200, type: Boolean })
  @ApiParam({ name: 'blockedUserId', type: 'number' })
  @Get('status/:blockedUserId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getBlockStatus(
    @Request() req,
    @Param('blockedUserId') blockedUserId: number,
  ) {
    try {
      const blockerUserId = req.user.id;
      return await this.userBlockService.getBlockStatus({
        blockerUserId,
        blockedUserId,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
