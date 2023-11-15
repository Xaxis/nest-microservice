import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export const databaseConfig = (configService: ConfigService): DataSourceOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [
    /* @TODO - Add entities */
  ],
  synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
  migrationsRun: configService.get('DB_MIGRATIONS_RUN') === 'true',
  logging: configService.get('DB_LOGGING') === 'true',
  migrations: [configService.get('DB_MIGRATIONS_PATH')],
});
