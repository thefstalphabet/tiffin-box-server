import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateKitchenDto, StatusType, UpdateKitchenDto } from './dto/kitchen.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Kitchen } from './entities/kitchen.entity';
import { idGenerator } from 'src/helper/idGenerator';
import { regexGenerator } from 'src/helper/regexGenerator';

@Injectable()
export class KitchenService {

  constructor(
    @InjectRepository(Kitchen)
    private readonly kitchenRepository: MongoRepository<Kitchen>,
  ) { }

  async create(createKitchenDto: CreateKitchenDto): Promise<Kitchen> {
    try {
      const existingKitchen = await this.kitchenRepository.findOne({ where: { email: createKitchenDto.email } });
      if (existingKitchen) {
        throw new BadRequestException('Kitchen with this email already exists.');
      }
      const kitchen = this.kitchenRepository.create({
        _id: idGenerator("KIT"),
        status: StatusType.ACTIVE,
        rating: 0,
        ...createKitchenDto,
      });

      return await this.kitchenRepository.save(kitchen);
    } catch (error) {
      throw new BadRequestException('Could not create kitchen.', error.message);
    }
  }

  async findAll(query: any): Promise<Kitchen[]> {
    const newQuery = regexGenerator(query)
    const kitchens = await this.kitchenRepository.find({ where: newQuery },);
    return kitchens
  }

  async findOne(id: string, email?: string): Promise<Kitchen> {
    try {
      let query = {}
      if (id) query["_id"] = id
      if (email) query["email"] = email
      const kitchen = await this.kitchenRepository.findOne({ where: query });
      if (!kitchen) {
        throw new BadRequestException('Kitchen not found.');
      }
      return kitchen;
    } catch (error) {
      throw new BadRequestException('Could not find kitchen.', error.message);
    }
  }

  async update(id: string, updateKitchenDto: UpdateKitchenDto): Promise<boolean> {
    try {
      const existingKitchen = await this.kitchenRepository.findOne({ where: { _id: id } });
      if (!existingKitchen) {
        throw new BadRequestException('Kitchen not found.');
      }
      await this.kitchenRepository.update({ _id: id }, updateKitchenDto)
      return true
    } catch (error) {
      throw new BadRequestException('Could not find kitchen.', error.message);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const existingKitchen = await this.kitchenRepository.findOne({ where: { _id: id } });
      if (!existingKitchen) {
        throw new BadRequestException('Kitchen not found.');
      }
      await this.kitchenRepository.delete({ _id: id });
      return true
    } catch (error) {
      throw new BadRequestException('Could not find kitchen.', error.message);
    }
  }
}
