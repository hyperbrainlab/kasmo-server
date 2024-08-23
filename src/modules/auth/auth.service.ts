import { LoginRequest } from './dto/login.request.dto';
import { LoginResponse } from './dto/login.response.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignupRequest } from './dto/signup.dto';
import { UpdateFcmTokenRequest } from './dto/update.fcm_token.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const user = await this.userService.findOneByUid(loginRequest.uid);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.deletedAt) {
      throw new UnauthorizedException('User is deactivated');
    }

    const payload = { sub: user.uid, username: user.name, id: user.id };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }

  async signup(signupRequest: SignupRequest) {
    const user = await this.userService.findOneByUid(signupRequest.uid);

    if (user) {
      await this.userService.restoreUser(user.id);
    } else {
      await this.userService.create(signupRequest);
    }

    return await this.login({ uid: signupRequest.uid });
  }

  async updateFcmToken(updateFcmTokenRequest: UpdateFcmTokenRequest) {
    const user = await this.userService.findOneByUid(updateFcmTokenRequest.uid);

    if (!user) {
      throw new UnauthorizedException();
    }

    return await this.userService.updateFcmToken(
      user.id,
      updateFcmTokenRequest.fcmToken,
    );
  }
}
