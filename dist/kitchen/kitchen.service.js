"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KitchenService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const kitchen_entity_1 = require("./entities/kitchen.entity");
const idGenerator_1 = require("../helper/idGenerator");
let KitchenService = class KitchenService {
    constructor(kitchenRepository) {
        this.kitchenRepository = kitchenRepository;
    }
    async create(createKitchenDto) {
        try {
            const existingKitchen = await this.kitchenRepository.findOne({ where: { email: createKitchenDto.email } });
            if (existingKitchen) {
                throw new common_1.BadRequestException('Kitchen with this email already exists.');
            }
            const kitchen = this.kitchenRepository.create(Object.assign({ _id: (0, idGenerator_1.idGenerator)("KIT"), active: true, rating: 0 }, createKitchenDto));
            return await this.kitchenRepository.save(kitchen);
        }
        catch (error) {
            throw new common_1.BadRequestException('Could not create kitchen.', error.message);
        }
    }
    async findAll() {
        const [kitchens, count] = await this.kitchenRepository.findAndCount();
        return kitchens;
    }
    async findOne(id, email) {
        try {
            let query = {};
            if (id)
                query["_id"] = id;
            if (email)
                query["email"] = email;
            const kitchen = await this.kitchenRepository.findOne({ where: query });
            if (!kitchen) {
                throw new common_1.BadRequestException('Kitchen not found.');
            }
            return kitchen;
        }
        catch (error) {
            throw new common_1.BadRequestException('Could not find kitchen.', error.message);
        }
    }
    update(id, updateKitchenDto) {
        return `This action updates a #${id} kitchen`;
    }
};
KitchenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(kitchen_entity_1.Kitchen)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], KitchenService);
exports.KitchenService = KitchenService;
//# sourceMappingURL=kitchen.service.js.map