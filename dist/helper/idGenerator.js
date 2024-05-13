"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idGenerator = void 0;
const uuid_1 = require("uuid");
function idGenerator(type) {
    const uuid = (0, uuid_1.v4)();
    return `${type}-${uuid}`;
}
exports.idGenerator = idGenerator;
//# sourceMappingURL=idGenerator.js.map