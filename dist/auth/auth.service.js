"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const kitchen_service_1 = require("../kitchen/kitchen.service");
let AuthService = class AuthService {
    constructor(userService, kitchenService, jwtService) {
        this.userService = userService;
        this.kitchenService = kitchenService;
        this.jwtService = jwtService;
    }
    async validateUser(loginDto, type) {
        const { email, password } = loginDto;
        let loginPerson;
        if (type === "user") {
            loginPerson = await this.userService.findOne(undefined, email);
        }
        else {
            loginPerson = await this.kitchenService.findOne(undefined, email);
        }
        if (loginPerson && loginPerson.password === password) {
            return { email: loginPerson.email, _id: loginPerson._id };
        }
        throw new common_1.UnauthorizedException('Invalid credentials');
    }
    async login(loginPersonData) {
        const payload = { email: loginPersonData.email, sub: loginPersonData._id };
        return {
            accessToken: await this.createToken(payload),
            refreshToken: await this.createToken(payload, { expiresIn: '15m' })
        };
    }
    async refreshAccessToken(refreshToken) {
        const decoded = this.jwtService.decode(refreshToken);
        if (!decoded) {
            throw new Error('Invalid token');
        }
        const { email } = decoded;
        const user = await this.userService.findOne(undefined, email);
        if (!user) {
            throw new Error('User not found');
        }
        const payload = { email: user.email, sub: user._id };
        return await this.createToken(payload);
    }
    async createToken(payload, signOptions) {
        return this.jwtService.sign(payload);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        kitchen_service_1.KitchenService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map