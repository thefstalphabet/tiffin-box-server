import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  find(@Query() query: any): Promise<User> {
    if (!query?._id) {
      throw new BadRequestException({
        message: `User id is required.`
      })
    }
    return this.userService.find(query?._id);
  }
}
