import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

const env = process.env.NODE_ENV || 'development';

@Module({
  imports: [

    // Load environment variables from .env files
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => dotenv.parse(fs.readFileSync(`config/.env`)),
        () => dotenv.parse(fs.readFileSync(`config/.env.${env}`)),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
