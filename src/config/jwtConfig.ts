import { envConfig } from "./envConfig";

export const jwtConfig = {
    global: true,
    secret: envConfig.jwtSecret,
    signOptions: { expiresIn: '1h' },
}