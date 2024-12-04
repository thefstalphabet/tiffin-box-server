import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KitchenService } from 'src/kitchen/kitchen.service';
import { Kitchen } from 'src/kitchen/entities/kitchen.entity';
import { TokenService } from 'src/token/token.service';
import { Address } from 'src/user/entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Kitchen, Address])],
  controllers: [AuthController],
  providers: [AuthService, UserService, KitchenService, TokenService],
})
export class AuthModule { }
