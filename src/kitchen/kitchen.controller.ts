import { Controller, Get, Post, Body, Patch, Param, BadRequestException, Query, Delete } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { CreateKitchenDto, UpdateKitchenDto } from './dto/kitchen.dto';
import { Kitchen } from './entities/kitchen.entity';

@Controller('kitchen')
export class KitchenController {
  constructor(private readonly kitchenService: KitchenService) { }

  @Post()
  create(@Body() createKitchenDto: CreateKitchenDto): Promise<Kitchen> {
    return this.kitchenService.create(createKitchenDto);
  }

  @Get()
  findAll(@Query() query): Promise<Kitchen[]> {
    return this.kitchenService.findAll(query);
  }

  @Get(":id")
  findOne(@Param('id') id: string): Promise<Kitchen> {
    if (!id) {
      throw new BadRequestException({
        message: `Kitchen id is required.`
      })
    }
    return this.kitchenService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKitchenDto: UpdateKitchenDto): Promise<boolean>  {
    return this.kitchenService.update(id, updateKitchenDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<boolean> {
    return this.kitchenService.delete(id);
  }
}
