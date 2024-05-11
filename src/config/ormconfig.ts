import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const ormConfig: TypeOrmModuleOptions = {
    type: "mongodb",
    url: process.env.DB_CONNECTION_STRING,
    useUnifiedTopology: true,
    entities: ["dist/**/*.entity{.ts,.js}"]
}