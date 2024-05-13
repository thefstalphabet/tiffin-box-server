"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateKitchenDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_kitchen_dto_1 = require("./create-kitchen.dto");
class UpdateKitchenDto extends (0, mapped_types_1.PartialType)(create_kitchen_dto_1.CreateKitchenDto) {
}
exports.UpdateKitchenDto = UpdateKitchenDto;
//# sourceMappingURL=update-kitchen.dto.js.map