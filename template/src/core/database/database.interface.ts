import { DataSource } from 'typeorm';

export interface IDatabaseService {
    onModuleInit(): Promise<void>;
    getDataSource(): DataSource;
    getDataSourceConfig(): any;
    getRepository<Entity>(entityClass: any, queryRunner?: any): any;
    createQueryBuilder<Entity>(entityClass: any, alias: string, queryRunner?: any): any;
    connect(): Promise<any>;
    disconnect(): Promise<void>;
    logQuery(query: string, parameters?: any[]): Promise<void>;
    isHealthy(): Promise<boolean>;
    startTransaction(): Promise<any>;
    commitTransaction(queryRunner: any): Promise<any>;
    rollbackTransaction(queryRunner: any): Promise<any>;
}