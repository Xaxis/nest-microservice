import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Template } from './data/entity/Template';

const env = process.env.NODE_ENV || 'dev';

@Module({
  imports: [

    // Load environment variables from .env files
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => dotenv.parse(fs.readFileSync(`.env`)),
        () => dotenv.parse(fs.readFileSync(`.env.${env}`)),
      ],
    }),

    // Load and initialize database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [Template],
        synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
        migrationsRun: configService.get('DB_MIGRATIONS_RUN') === 'true',
        logging: configService.get('DB_LOGGING') === 'true',
        migrations: [configService.get('DB_MIGRATIONS_PATH')],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
