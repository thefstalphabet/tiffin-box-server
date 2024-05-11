import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity'; // Assuming you have a User entity
import { CreateUserDto } from './dto/user.dto'; // Assuming you have a CreateUserDto

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
      if (existingUser) {
        throw new BadRequestException('User with this email already exists.');
      }

      const user = this.userRepository.create({
        _id: uuidv4(),
        active: true,
        ...createUserDto,
      });

      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Could not create user.', error.message);
    }
  }

  async find(_id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { _id } });
      if (!user) {
        throw new BadRequestException('User not found.');
      }
      return user;
    } catch (error) {
      throw new BadRequestException('Could not find user.', error.message);
    }
  }
}
