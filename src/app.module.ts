import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { KitchenModule } from './kitchen/kitchen.module';
import { envConfig } from './config/envConfig';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: envConfig.dbConnectionString,
      useUnifiedTopology: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,  // Optional
      useNewUrlParser: true  // Optional
    }),
    UserModule,
    AuthModule,
    KitchenModule,
    AddressModule
  ],
  controllers: [AppController],
  providers: [{
    provide: APP_PIPE,
    useClass: ValidationPipe,
  },],
})
export class AppModule { }
