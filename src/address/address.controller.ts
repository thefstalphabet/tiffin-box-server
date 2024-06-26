import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Query } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto, UpdateAddressDto } from './dto/address.dto';
import { Address } from './entities/address.entity';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  findAll(@Query() query): Promise<Address[]> {
    return this.addressService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Address> {
    if (!id) {
      throw new BadRequestException({
        message: `Address id is required.`
      })
    }
    return this.addressService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto): Promise<boolean> {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<boolean> {
    return this.addressService.delete(id);
  }
}
