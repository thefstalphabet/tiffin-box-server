import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Address } from './entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule { }
