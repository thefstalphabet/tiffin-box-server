import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("login/:type")
  async Userlogin(@Body() loginDto: LoginDto, @Param('type') type: "user" | "kitchen") {
    const loginPerson = await this.authService.validateUser(loginDto, type);
    return this.authService.login(loginPerson);
  }
}
