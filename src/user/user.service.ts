import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity'; // Assuming you have a User entity
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'; // Assuming you have a CreateUserDto
import { idGenerator } from 'src/helper/idGenerator';
import { StatusType } from 'src/kitchen/dto/kitchen.dto';

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
      const payload = {
        _id: idGenerator("USE"),
        status: StatusType.ACTIVE,
        ...createUserDto,
      }
      const user = this.userRepository.create(payload);

      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Could not create user.', error.message);
    }
  }

  async findAll(): Promise<User[]> {
    const [users, count] = await this.userRepository.findAndCount();
    return users
  }

  async findOne(id: string, email?: string): Promise<User> {
    try {
      let query = {}
      if (id) query["_id"] = id
      if (email) query["email"] = email
      const user = await this.userRepository.findOne({ where: query });
      if (!user) {
        throw new BadRequestException('User not found.');
      }
      return user;
    } catch (error) {
      throw new BadRequestException('Could not find user.', error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<boolean> {
    try {
      const existingUser = await this.userRepository.findOne({ where: { _id: id } });
      if (!existingUser) {
        throw new BadRequestException('User not found.');
      }
      await this.userRepository.update({ _id: id }, updateUserDto)
      return true
    } catch (error) {
      throw new BadRequestException('Could not find user.', error.message);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const existingUser = await this.userRepository.findOne({ where: { _id: id } });
      if (!existingUser) {
        throw new BadRequestException('User not found.');
      }
      await this.userRepository.delete({ _id: id });
      return true
    } catch (error) {
      throw new BadRequestException('Could not find User.', error.message);
    }
  }
}
