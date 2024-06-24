import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envConfig } from './config/envConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(envConfig.isDev);
  app.setGlobalPrefix("api")
  app.enableCors({ origin: "*" })
  await app.listen(envConfig.port);
}
bootstrap();
