import { UserService } from './user.service';
import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  InternalServerErrorException,
  ValidationPipe,
  UsePipes,
  NotFoundException,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';

import { UserProfileDto } from './dto/retrieve.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

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
  async me(@Request() req): Promise<UserProfileDto> {
    try {
      const userId = req.user.id;

      const user = await this.userService.findOneById(userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '로그인 한 유저 정보 업데이트' })
  @ApiTags('user')
  @ApiResponse({ status: 200, type: UserProfileDto })
  @Put('profile')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Request() req, @Body() userProfileDto: UpdateUserDto) {
    try {
      const userId = req.user.id;

      return await this.userService.update(Number(userId), userProfileDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '유저 정보 조회' })
  @ApiTags('user')
  @ApiResponse({ status: 200, type: UserProfileDto })
  @Get('profile/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async profile(@Param('id') userId: number): Promise<UserProfileDto> {
    try {
      const user = await this.userService.findOneById(userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
