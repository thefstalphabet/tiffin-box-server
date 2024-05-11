"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
const envConfig_1 = require("./envConfig");
exports.jwtConfig = {
    secret: envConfig_1.envConfig.jwtSecret,
    signOptions: { expiresIn: '1h' },
};
//# sourceMappingURL=jwtConfig.js.map