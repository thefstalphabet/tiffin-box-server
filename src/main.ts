import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envConfig } from './config/envConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api")
  app.enableCors({ origin: envConfig.isDev ? 'http://localhost:3000/' : "https://tiffin-box.netlify.app/" })
  await app.listen(envConfig.port);
}
bootstrap();
