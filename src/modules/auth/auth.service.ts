import { LoginRequest } from './dto/login.request.dto';
import { LoginResponse } from './dto/login.response.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignupRequest } from './dto/signup.dto';
import { UpdateFcmTokenRequest } from './dto/update.fcm_token.request.dto';
import { AdminLoginRequest } from './dto/admin.login.request.dto';
import { UserType } from '../user/constants';
import { NotificationService } from '../notification/notification.service';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private notificationService: NotificationService,
    private dataSource: DataSource,
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

  async adminLogin(adminLoginRequest: AdminLoginRequest) {
    const user = await this.userService.findOneByUserId(
      adminLoginRequest.userId,
    );

    if (!user || user.userType !== UserType.ADMIN) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // const hash = await bcrypt.hash(adminLoginRequest.password, 10);
    // console.log(hash);

    const isPasswordValid = await bcrypt.compare(
      adminLoginRequest.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.uid,
      username: user.name,
      id: user.id,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }

  async signup(signupRequest: SignupRequest) {
    const existingUser = await this.userService.findOneByUid(signupRequest.uid);

    if (existingUser) {
      await this.userService.restoreUser(existingUser.id);
    } else {
      await this.createNewUser(signupRequest);
    }

    return this.login({ uid: signupRequest.uid });
  }

  private async createNewUser(signupRequest: SignupRequest) {
    return this.dataSource.transaction(async () => {
      const user = await this.userService.create(signupRequest);

      const defaultNotificationSettings = {
        chatNotification: true,
        postCommentNotification: true,
        replyCommentNotification: true,
        announcementNotification: true,
      };

      const notification = await this.notificationService.createNotification(
        user.id,
        defaultNotificationSettings,
      );

      await this.userService.update(user.id, {
        ...user,
        notificationId: notification.identifiers[0].id,
      });
    });
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

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async validatePassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
