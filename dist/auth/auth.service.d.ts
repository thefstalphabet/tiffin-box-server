import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { KitchenService } from 'src/kitchen/kitchen.service';
export declare class AuthService {
    private readonly userService;
    private readonly kitchenService;
    private readonly jwtService;
    constructor(userService: UserService, kitchenService: KitchenService, jwtService: JwtService);
    validateUser(loginDto: LoginDto, type: "user" | "kitchen"): Promise<{
        email: string;
        _id: string;
    }>;
    login(loginPersonData: any): Promise<{
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
