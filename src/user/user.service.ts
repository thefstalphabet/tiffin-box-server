import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const payload = {
      _id: uuidv4(),
      active: true,
      ...createUserDto
    }
    // const user = await this.userRepository.find({email: createUserDto.email})
    try {
      const createdUser = await this.userRepository.save(payload);
      return createdUser;
    } catch (error) {
      throw new BadRequestException({
        error: error,
        message: `Something went wrong!`
      })
    }
  }
}
