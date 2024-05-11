import * as dotenv from 'dotenv';
dotenv.config();

export const envConfig = {
    port: process.env.PORT,
    dbConnectionString: process.env.DB_CONNECTION_STRING,
    jwtSecret: process.env.JWT_SECRET
}