import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envConfig } from './config/envConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`Server is running Succesfully in ${envConfig.isDev ? "Deveploment" : "Production Mode"}`);
  app.setGlobalPrefix("api")
  app.enableCors({ origin: "*" })
  await app.listen(envConfig.port);
}
bootstrap();
