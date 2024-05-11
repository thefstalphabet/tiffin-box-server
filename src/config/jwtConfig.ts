import { env } from "process";
import { envConfig } from "./envConfig";

export const jwtConfig = {
    secret: envConfig.jwtSecret,
    signOptions: { expiresIn: '1h' },
}