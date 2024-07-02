import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';
import { CreateAddressDto, UpdateAddressDto } from './dto/address.dto';
import { AuthGuard } from 'src/auth/auth.gaurd';

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Patch('address/:id')
  @UseGuards(AuthGuard)
  async updateAddress(@Param('id') addressId: string, @Body() updateData: UpdateAddressDto): Promise<boolean> {
    return this.userService.updateAddress(addressId, updateData);
  }

  @Post('address')
  @UseGuards(AuthGuard)
  async createAddress(@Body() createAddressDto: CreateAddressDto, @Req() req: any): Promise<Address> {
    return this.userService.createAddress(createAddressDto, req?.user?.id);
  }

  @Get('address')
  @UseGuards(AuthGuard)
  async findAddresses(@Req() req: any): Promise<Address[]> {
    return this.userService.findAddresses(req?.user?.id);
  }

  @Delete('address/:id')
  @UseGuards(AuthGuard)
  async deleteAddress(@Req() req: any, @Param('id') id: string): Promise<boolean> {
    return this.userService.deleteUserAddress(req?.user?.id, id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string): Promise<User> {
    if (!id) {
      throw new BadRequestException({
        message: `User id is required.`
      })
    }
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<boolean> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string): Promise<boolean> {
    return this.userService.delete(id);
  }
}
