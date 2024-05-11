"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormConfig = void 0;
const envConfig_1 = require("./envConfig");
exports.ormConfig = {
    type: "mongodb",
    url: envConfig_1.envConfig.dbConnectionString,
    useUnifiedTopology: true,
    entities: ["dist/**/*.entity{.ts,.js}"]
};
//# sourceMappingURL=ormConfig.js.map