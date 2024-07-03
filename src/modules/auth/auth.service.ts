import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    user_id: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(user_id);

    if (user?.password_hash !== password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.user_id, username: user.name };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
