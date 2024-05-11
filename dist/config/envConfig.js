"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.envConfig = {
    port: process.env.PORT,
    dbConnectionString: process.env.DB_CONNECTION_STRING,
    jwtSecret: process.env.JWT_SECRET
};
//# sourceMappingURL=envConfig.js.map