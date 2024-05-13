import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateKitchenDto, UpdateKitchenDto } from './dto/kitchen.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kitchen } from './entities/kitchen.entity';
import { idGenerator } from 'src/helper/idGenerator';

@Injectable()
export class KitchenService {

  constructor(
    @InjectRepository(Kitchen)
    private readonly kitchenRepository: Repository<Kitchen>,
  ) { }

  async create(createKitchenDto: CreateKitchenDto): Promise<Kitchen> {
    try {
      const existingKitchen = await this.kitchenRepository.findOne({ where: { email: createKitchenDto.email } });
      if (existingKitchen) {
        throw new BadRequestException('Kitchen with this email already exists.');
      }
      const kitchen = this.kitchenRepository.create({
        _id: idGenerator("KIT"),
        active: true,
        rating: 0,
        ...createKitchenDto,
      });

      return await this.kitchenRepository.save(kitchen);
    } catch (error) {
      throw new BadRequestException('Could not create kitchen.', error.message);
    }
  }

  async findAll(): Promise<Kitchen[]> {
    const [kitchens, count] = await this.kitchenRepository.findAndCount();
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

  update(id: number, updateKitchenDto: UpdateKitchenDto) {
    return `This action updates a #${id} kitchen`;
  }
}
