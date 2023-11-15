import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions, EntityTarget, QueryRunner, Repository, SelectQueryBuilder } from 'typeorm';
import { IDatabaseService } from './database.interface';

@Injectable()
export class DatabaseService implements IDatabaseService, OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource
  ) {}

  async onModuleInit() {
    try {
      if (!this.dataSource.isInitialized) {
        await this.dataSource.initialize();
      }
      await this.dataSource.runMigrations();
      console.log('Migrations ran successfully.');
    } catch (error) {
      console.error('Error during Data Source initialization:', error);
    }
  }

  getDataSource(): DataSource {
    return this.dataSource;
  }

  getDataSourceConfig(): DataSourceOptions {
    return this.dataSource.options;
  }

  getRepository<T>(entity: EntityTarget<T>): Repository<T> {
    return this.dataSource.getRepository(entity);
  }

  createQueryBuilder(entity: EntityTarget<any>, alias: string): SelectQueryBuilder<any> {
    return this.dataSource.createQueryBuilder(entity, alias);
  }

  async connect(): Promise<DataSource> {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
    }
    return this.dataSource;
  }

  async disconnect(): Promise<void> {
    if (this.dataSource.isInitialized) {
      await this.dataSource.destroy();
    }
  }

  async logQuery(query: string, parameters?: any[]): Promise<void> {
    console.log('Query:', query);
    if (parameters && parameters.length) {
      console.log('Parameters:', parameters);
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      const result = await this.dataSource.query('SELECT 1');
      return !!result;
    } catch (error) {
      return false;
    }
  }

  async startTransaction(): Promise<QueryRunner> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    return queryRunner;
  }

  async commitTransaction(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.commitTransaction();
  }

  async rollbackTransaction(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.rollbackTransaction();
  }
}
