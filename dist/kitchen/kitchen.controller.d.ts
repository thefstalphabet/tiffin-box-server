import { KitchenService } from './kitchen.service';
import { CreateKitchenDto, UpdateKitchenDto } from './dto/kitchen.dto';
import { Kitchen } from './entities/kitchen.entity';
export declare class KitchenController {
    private readonly kitchenService;
    constructor(kitchenService: KitchenService);
    create(createKitchenDto: CreateKitchenDto): Promise<Kitchen>;
    findAll(): Promise<Kitchen[]>;
    findOne(id: string): Promise<Kitchen>;
    update(id: string, updateKitchenDto: UpdateKitchenDto): string;
}
