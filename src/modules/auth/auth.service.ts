import { LoginRequestDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';
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

  async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userService.findOneByUid(loginRequestDto.uid);

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.uid, username: user.name, id: user.id };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
    };
  }

  async signup(signupDto: SignupDto) {
    await this.userService.create(signupDto);

    return await this.login({ uid: signupDto.uid });
  }
}
