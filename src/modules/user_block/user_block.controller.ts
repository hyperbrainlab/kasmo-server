import { UserBlockService } from './user_block.service';
import {
  Controller,
  Post,
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
  ApiResponse,
} from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';

@Controller('block')
export class UserBlockController {
  constructor(private userBlockService: UserBlockService) {}

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
}
