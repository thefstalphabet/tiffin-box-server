import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { envConfig } from "./envConfig";

export const ormConfig: TypeOrmModuleOptions = {
    type: "mongodb",
    url: envConfig.dbConnectionString,
    useUnifiedTopology: true,
    entities: ["dist/**/*.entity{.ts,.js}"]
}