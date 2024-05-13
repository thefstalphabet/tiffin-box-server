import { Module } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { KitchenController } from './kitchen.controller';
import { Kitchen } from './entities/kitchen.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Kitchen])],
  controllers: [KitchenController],
  providers: [KitchenService]
})
export class KitchenModule {}
