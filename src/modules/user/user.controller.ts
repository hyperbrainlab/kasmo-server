import { UserService } from './user.service';
import {
  Controller,
  Get,
  Patch,
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
  ParseIntPipe,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';

import { UserProfileResponse } from './dto/retrieve.user.dto';
import { UpdateUserRequest } from './dto/update.user.dto';
import { UpdateUserNameRequest } from './dto/update.user.name.dto';

import { plainToClass } from 'class-transformer';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '로그인 한 유저 정보 조회' })
  @ApiTags('user')
  @ApiResponse({ status: 200, type: UserProfileResponse })
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async me(@Request() req): Promise<UserEntity> {
    try {
      const userId = req.user.id;

      const user = await this.userService.findUser(userId);

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
  @ApiResponse({ status: 200, type: UserProfileResponse })
  @Put('profile')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: false }))
  async update(@Request() req, @Body() updateUserRequest: UpdateUserRequest) {
    try {
      const userId = req.user.id;

      const user = await this.userService.update(
        Number(userId),
        updateUserRequest,
      );

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '로그인 한 닉네임 업데이트' })
  @ApiTags('user')
  @ApiResponse({ status: 200, type: UserProfileResponse })
  @ApiBody({ type: UpdateUserNameRequest })
  @Patch('profile/name')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: false }))
  async updateName(
    @Request() req,
    @Body() updateUserNameRequest: UpdateUserNameRequest,
  ) {
    try {
      const userId = req.user.id;

      const user = await this.userService.updateName(
        Number(userId),
        updateUserNameRequest.name,
      );

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Patch('company/:companyId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: false }))
  async updateCompany(
    @Request() req,
    @Body('companyId', ParseIntPipe) companyId: number,
  ) {
    try {
      const userId = req.user.id;

      const user = await this.userService.updateCompany(
        Number(userId),
        companyId,
      );

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '유저 정보 조회' })
  @ApiTags('user')
  @ApiResponse({ status: 200, type: UserProfileResponse })
  @Get('profile/:userId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async profile(@Param('userId') userId: number): Promise<UserEntity> {
    try {
      const user = await this.userService.findUser(userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getUsers(): Promise<Array<UserEntity>> {
    try {
      const users = await this.userService.findUsers();

      if (!users) {
        throw new NotFoundException('users not found');
      }

      return users;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
