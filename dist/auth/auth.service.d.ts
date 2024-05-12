import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(loginDto: LoginDto): Promise<{
        email: string;
        _id: string;
    }>;
    login(user: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshAccessToken(refreshToken: string): Promise<string>;
    createToken(payload: {
        email: string;
        sub: string;
    }, signOptions?: {
        expiresIn: string;
    }): Promise<string>;
}
