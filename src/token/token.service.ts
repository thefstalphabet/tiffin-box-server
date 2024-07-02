import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TokenService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }
    async refreshAccessToken(refreshToken: string) {
        const decoded = this.jwtService.decode(refreshToken);
        if (!decoded) {
            throw new Error('Invalid token');
        }
        const { id } = decoded as { id: string; sub: string };
        const user = await this.userService.findOne(undefined, id);
        if (!user) {
            throw new Error('User not found');
        }
        const payload = { id: user._id, sub: user.email };
        return await this.generateToken(payload);
    }

    async generateToken(payload: { id: string, sub: string }, signOptions?: { expiresIn: string }) {
        return this.jwtService.sign(payload);
    }

    async verifyToken(token: string) {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
