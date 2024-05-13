import { CreateKitchenDto, UpdateKitchenDto } from './dto/kitchen.dto';
import { Repository } from 'typeorm';
import { Kitchen } from './entities/kitchen.entity';
export declare class KitchenService {
    private readonly kitchenRepository;
    constructor(kitchenRepository: Repository<Kitchen>);
    create(createKitchenDto: CreateKitchenDto): Promise<Kitchen>;
    findAll(): Promise<Kitchen[]>;
    findOne(id: string, email?: string): Promise<Kitchen>;
    update(id: number, updateKitchenDto: UpdateKitchenDto): string;
}
