import {Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {DataSource, DataSourceOptions, EntityTarget, QueryRunner, Repository, SelectQueryBuilder} from 'typeorm'
import {IOrchestrationDataSource} from './orchestration.interface'

@Injectable()
export class OrchestrationDataSourceService implements IOrchestrationDataSource {
    private readonly dataSource: DataSource;

    constructor(private readonly configService: ConfigService) {
        const options: DataSourceOptions = this.configureDataSourceOptions();
        this.dataSource = new DataSource(options);
    }

    private configureDataSourceOptions(): DataSourceOptions {
        return {
            type: 'postgres',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_DATABASE'),
            entities: [],
            subscribers: [],
            synchronize: this.configService.get('DB_SYNCHRONIZE') === 'true',
            migrationsRun: this.configService.get('DB_MIGRATIONS_RUN') === 'true',
            logging: this.configService.get('DB_LOGGING') === 'true',
            migrations: [this.configService.get('DB_MIGRATIONS_PATH')],
        };
    }

    private logQuery(query: string, parameters?: any[]): void {
        console.log('Query:', query);
        if (parameters && parameters.length) {
            console.log('Parameters:', parameters);
        }
    }

    async onModuleInit() {
        try {
            const dataSourceRet = await this.dataSource.initialize();
            console.log('Data Source initialized');
            await dataSourceRet.runMigrations();
            console.log('Migrations run successfully');
        } catch (error) {
            console.error('Error during Data Source initialization:', error);
        }
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

    getDataSourceConfig(): DataSourceOptions {
        return this.dataSource.options;
    }

    getDataSource(): DataSource {
        return this.dataSource;
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

    createQueryBuilder(entity: EntityTarget<any>, alias: string): SelectQueryBuilder<any> {
        return this.dataSource.createQueryBuilder(entity, alias);
    }

    getRepository<T>(entity: EntityTarget<T>): Repository<T> {
        return this.dataSource.getRepository(entity);
    }
}