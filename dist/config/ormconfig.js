"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormConfig = void 0;
exports.ormConfig = {
    type: "mongodb",
    url: process.env.DB_CONNECTION_STRING,
    useUnifiedTopology: true,
    entities: ["dist/**/*.entity{.ts,.js}"]
};
//# sourceMappingURL=ormconfig.js.map