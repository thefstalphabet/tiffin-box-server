import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { KitchenService } from 'src/kitchen/kitchen.service';
import { Kitchen } from 'src/kitchen/entities/kitchen.entity';
import { User } from 'src/user/entities/user.entity';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly kitchenService: KitchenService,
    private readonly tokenService: TokenService,
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
      return loginPerson;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(loginPersonData: any) {
    const payload = { id: loginPersonData._id, sub: loginPersonData.email };
    return {
      accessToken: await this.tokenService.generateToken(payload, { expiresIn: '15m' }),
      refreshToken: await this.tokenService.generateToken(payload, { expiresIn: '5d' }),
      user: loginPersonData
    }
  }


}
