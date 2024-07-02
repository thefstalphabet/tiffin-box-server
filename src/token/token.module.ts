import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/user/entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address])],
  controllers: [TokenController],
  providers: [TokenService, JwtService, UserService]
})
export class TokenModule { }
