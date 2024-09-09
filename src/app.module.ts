import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configurationMongo } from './configuration/configuration-mongo';
import { HeroesModule } from './modules/heroes/heroes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurationMongo],
      envFilePath: `./env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongo.MONGO_URI'), // <--- Asegúrate de que el nombre coincide
      }),
      inject: [ConfigService], // <--- Inyecta el servicio correctamente
    }),
    HeroesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
