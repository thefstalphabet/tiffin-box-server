import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { KitchenService } from 'src/kitchen/kitchen.service';
import { Kitchen } from 'src/kitchen/entities/kitchen.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Address, Kitchen])],
    controllers: [UserController],
    providers: [UserService, KitchenService],
})
export class UserModule { }
