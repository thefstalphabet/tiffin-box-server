import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { KitchenService } from 'src/kitchen/kitchen.service';
import { Kitchen } from 'src/kitchen/entities/kitchen.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly kitchenService: KitchenService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(loginDto: LoginDto, type: "user" | "kitchen") {
    const { email, password } = loginDto;
    let loginPerson: User | Kitchen;
    if (type === "user") {
      loginPerson = await this.userService.findOne(undefined, email);
    } else {
      loginPerson = await this.kitchenService.findOne(undefined, email);
    }

    if (loginPerson && loginPerson.password === password) {
      return { email: loginPerson.email, _id: loginPerson._id };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(loginPersonData: any) {
    const payload = { email: loginPersonData.email, sub: loginPersonData._id };
    return {
      accessToken: await this.createToken(payload, { expiresIn: '15m' }),
      refreshToken: await this.createToken(payload, { expiresIn: '5d' })
    }
  }

  async refreshAccessToken(refreshToken: string) {
    const decoded = this.jwtService.decode(refreshToken);
    if (!decoded) {
      throw new Error('Invalid token');
    }
    const { email } = decoded as { email: string; sub: string };
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
