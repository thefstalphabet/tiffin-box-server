import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findOne(undefined, email);

    if (user && user.password === password) {
      return { email: user.email, _id: user._id };
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      accessToken: await this.createToken(payload),
      refreshToken: await this.createToken(payload, { expiresIn: '15m' })
    }
  }

  async refreshAccessToken(refreshToken: string) {
    const decoded = this.jwtService.decode(refreshToken);
    if (!decoded) {
      throw new Error('Invalid token');
    }
    const { email, sub } = decoded as { email: string; sub: string };
    const user = await this.userService.findOne(undefined, email);
    if (!user) {
      throw new Error('User not found');
    }
    const payload = { email: user.email, sub: user._id };
    return await this.createToken(payload);
  }

  async createToken(payload: { email: string, sub: string }, signOptions?: { expiresIn: string }) {
    return this.jwtService.sign(payload);
  }
}
