import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwtConfig';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register(jwtConfig),],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule { }