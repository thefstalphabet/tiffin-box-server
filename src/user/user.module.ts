import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Address])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule { }
