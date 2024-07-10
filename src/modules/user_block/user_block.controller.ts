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
  @Post(':blocked_id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async report(@Request() req, @Param('blocked_id') blocked_id: number) {
    try {
      const blocker_id = req.user.id;

      return await this.userBlockService.block({
        blocker_id,
        blocked_id,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
