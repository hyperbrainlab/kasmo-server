import { UserService } from './user.service';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
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

import { UserProfileDto } from './dto/retrieve.user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '로그인 한 유저 정보 조회' })
  @ApiTags('user')
  @ApiResponse({ status: 200, type: UserProfileDto })
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async profile(@Request() req): Promise<UserProfileDto> {
    try {
      const id = req.user.id;

      return await this.userService.findOne(Number(id));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
