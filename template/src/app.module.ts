import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { GraphqlModule } from './core/graphql/graphql.module';
import { SampleResolver } from './core/graphql/resolvers/sample.resolver';
import { SampleService } from './core/graphql/services/sample.service';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => dotenv.parse(fs.readFileSync(`./config/.env`)),
        () => dotenv.parse(fs.readFileSync(`./config/.env.${process.env.NODE_ENV || 'development'}`)),
      ],
    }),

    // Load modules
    DatabaseModule,
    GraphqlModule
  ],
  controllers: [AppController],
  providers: [AppService, SampleResolver, SampleService],
})
export class AppModule {}
