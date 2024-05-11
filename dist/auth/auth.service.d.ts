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
        access_token: string;
    }>;
}
