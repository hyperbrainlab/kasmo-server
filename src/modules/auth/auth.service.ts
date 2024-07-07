import { SigninDto } from './dto/signin.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(signinDto: SigninDto): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByUid(signinDto.uid);

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.uid, username: user.name, id: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signup(signupDto: SignupDto) {
    await this.userService.create(signupDto);

    return await this.login({ uid: signupDto.uid });
  }
}
