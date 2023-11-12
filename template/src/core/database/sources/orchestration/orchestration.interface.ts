import { DataSource, DataSourceOptions } from 'typeorm';

export interface IOrchestrationDataSource {
    onModuleInit(): Promise<void>;
    connect(): Promise<any>;
    disconnect(): Promise<void>;
    getDataSourceConfig(): DataSourceOptions;
    getDataSource(): DataSource;
    isHealthy(): Promise<boolean>;
    startTransaction(): Promise<any>;
    commitTransaction(queryRunner: any): Promise<any>;
    rollbackTransaction(queryRunner: any): Promise<any>;
    createQueryBuilder<Entity>(entityClass: any, alias: string, queryRunner?: any): any;
    getRepository<Entity>(entityClass: any, queryRunner?: any): any;
}