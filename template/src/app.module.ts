import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';

@Module({
  imports: [

    // Load environment variables from .env files
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => dotenv.parse(fs.readFileSync(`.env`)),
        () => dotenv.parse(fs.readFileSync(`.env.${process.env.NODE_ENV || 'dev'}`)),
      ],
    }),

    // Load DatabaseModule
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
