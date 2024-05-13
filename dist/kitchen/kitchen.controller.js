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
exports.KitchenController = void 0;
const common_1 = require("@nestjs/common");
const kitchen_service_1 = require("./kitchen.service");
const kitchen_dto_1 = require("./dto/kitchen.dto");
let KitchenController = class KitchenController {
    constructor(kitchenService) {
        this.kitchenService = kitchenService;
    }
    create(createKitchenDto) {
        return this.kitchenService.create(createKitchenDto);
    }
    findAll() {
        return this.kitchenService.findAll();
    }
    findOne(id) {
        if (!id) {
            throw new common_1.BadRequestException({
                message: `Kitchen id is required.`
            });
        }
        return this.kitchenService.findOne(id);
    }
    update(id, updateKitchenDto) {
        return this.kitchenService.update(+id, updateKitchenDto);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kitchen_dto_1.CreateKitchenDto]),
    __metadata("design:returntype", Promise)
], KitchenController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KitchenController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KitchenController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, kitchen_dto_1.UpdateKitchenDto]),
    __metadata("design:returntype", void 0)
], KitchenController.prototype, "update", null);
KitchenController = __decorate([
    (0, common_1.Controller)('kitchen'),
    __metadata("design:paramtypes", [kitchen_service_1.KitchenService])
], KitchenController);
exports.KitchenController = KitchenController;
//# sourceMappingURL=kitchen.controller.js.map