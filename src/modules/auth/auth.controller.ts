import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  InternalServerErrorException,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @ApiOperation({ summary: '로그인' })
  @ApiTags('auth')
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() signinDto: SigninDto) {
    try {
      await this.authService.login(signinDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiTags('auth')
  @Post('signup')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async signup(@Body() signupDto: SignupDto) {
    try {
      await this.authService.signup(signupDto);
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
      const id = req.user.id;

      return this.userService.remove(Number(id));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
