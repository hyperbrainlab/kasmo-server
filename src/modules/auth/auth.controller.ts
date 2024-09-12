import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Patch,
  UseGuards,
  Request,
  InternalServerErrorException,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

import { LoginRequest } from './dto/login.request.dto';
import { SignupRequest } from './dto/signup.dto';
import { LoginResponse } from './dto/login.response.dto';
import { UpdateFcmTokenRequest } from './dto/update.fcm_token.request.dto';
import { AdminLoginRequest } from './dto/admin.login.request.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @ApiOperation({ summary: '로그인' })
  @ApiTags('auth')
  @ApiResponse({ status: 200, type: LoginResponse })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await this.authService.login(loginRequest);

      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('admin/login')
  async adminLogin(
    @Body() adminLoginRequest: AdminLoginRequest,
  ): Promise<LoginResponse> {
    try {
      const response = await this.authService.adminLogin(adminLoginRequest);

      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiTags('auth')
  @ApiResponse({ status: 200, type: LoginResponse })
  @Post('signup')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async signup(@Body() signupDto: SignupRequest) {
    try {
      return await this.authService.signup(signupDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiOperation({ summary: '회원탈퇴' })
  @ApiTags('auth')
  @Post('withdraw')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async withdraw(@Request() req) {
    try {
      const userId = req.user.id;

      return this.userService.inactivate(Number(userId));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiOperation({ summary: 'fcm 토큰 업데이트' })
  @ApiTags('auth')
  @Patch('fcm-token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async updateFcmToken(@Body() updateFcmTokenRequest: UpdateFcmTokenRequest) {
    try {
      return this.authService.updateFcmToken(updateFcmTokenRequest);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
