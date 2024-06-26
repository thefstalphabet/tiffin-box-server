import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAddressDto, UpdateAddressDto } from './dto/address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { idGenerator } from 'src/helper/idGenerator';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) { }
  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    try {
      const payload = {
        _id: idGenerator("ADD"),
        ...createAddressDto,
      }
      const address = this.addressRepository.create(payload);

      return await this.addressRepository.save(address);
    } catch (error) {
      throw new BadRequestException('Could not create new address.', error.message);
    }
  }

  async findAll(query: any): Promise<Address[]> {
    const address = await this.addressRepository.find({ where: query });
    return address
  }

  async findOne(id: string): Promise<Address> {
    try {
      const address = await this.addressRepository.findOne({ where: { _id: id } });
      if (!address) {
        throw new BadRequestException('Address not found.');
      }
      return address;
    } catch (error) {
      throw new BadRequestException('Could not find address.', error.message);
    }
  }

  async update(id: string, updateAddressDto: UpdateAddressDto): Promise<boolean> {
    try {
      const existingAddress = await this.addressRepository.findOne({ where: { _id: id } });
      if (!existingAddress) {
        throw new BadRequestException('Address not found.');
      }
      await this.addressRepository.update({ _id: id }, updateAddressDto)
      return true
    } catch (error) {
      throw new BadRequestException('Could not find Address.', error.message);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const existingAddress = await this.addressRepository.findOne({ where: { _id: id } });
      if (!existingAddress) {
        throw new BadRequestException('Address not found.');
      }
      await this.addressRepository.delete({ _id: id });
      return true
    } catch (error) {
      throw new BadRequestException('Could not find Address.', error.message);
    }
  }
}
