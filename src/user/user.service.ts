import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'; // Assuming you have a User entity
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'; // Assuming you have a CreateUserDto
import { idGenerator } from 'src/helper/idGenerator';
import { StatusType } from 'src/kitchen/dto/kitchen.dto';
import { Address } from './entities/address.entity';
import { CreateAddressDto, UpdateAddressDto } from './dto/address.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
      if (existingUser) {
        throw new BadRequestException('User with this email already exists.');
      }
      const payload: User = {
        _id: idGenerator("USE"),
        status: StatusType.ACTIVE,
        addressIds: [],
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

  async createAddress(createAddressDto: CreateAddressDto, userId: string): Promise<Address> {
    try {
      let existingUser = await this.findOne(userId);
      const payload = {
        _id: idGenerator("ADD"),
        userId: userId,
        ...createAddressDto,
      }
      const address = this.addressRepository.create(payload);
      await this.addressRepository.save(address);

      await this.userRepository.update({ _id: userId }, { addressIds: [...existingUser.addressIds, address?._id] })
      return address
    } catch (error) {
      throw new BadRequestException('Could not create user address.', error.message);
    }
  }

  async findAddresses(userId: string): Promise<Address[]> {
    const addresses = await this.addressRepository.find({where: {userId: userId}});
    return addresses
  }

  async updateAddress(addressId: string, updateData: UpdateAddressDto): Promise<boolean> {
    try {
      const address = await this.addressRepository.findOneBy({ _id: addressId });
      if (!address) throw new Error('Address not found');

      await this.addressRepository.update({ _id: addressId }, updateData)
      return true
    } catch (error) {
      throw new BadRequestException('Could not find user address.', error.message);
    }
  }

  async deleteUserAddress(userId: string, addressId: string): Promise<boolean> {
    try {
      const address = await this.addressRepository.findOneBy({ _id: addressId });
      if (!address) throw new Error('Address not found');

      await this.addressRepository.delete({ _id: addressId });
      const user = await this.userRepository.findOneBy({ _id: userId });
      if (user) {
        let ids = user.addressIds.filter(ids => ids !== addressId);
        await this.userRepository.update({ _id: userId }, { addressIds: ids });
      }
      return true
    } catch (error) {
      throw new BadRequestException('Could not find user address.', error.message);
    }
  }
}
