import { Body, Controller, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("login/:type")
  async Userlogin(@Body() loginDto: LoginDto, @Param('type') type: "user" | "kitchen") {
    const loginPerson = await this.authService.validateUser(loginDto, type);
    return this.authService.login(loginPerson);
  }

  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    try {
      const { refreshToken } = refreshTokenDto;
      const newAccessToken = await this.authService.refreshAccessToken(refreshToken);
      return { accessToken: newAccessToken };
    } catch (error) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
  }
}
