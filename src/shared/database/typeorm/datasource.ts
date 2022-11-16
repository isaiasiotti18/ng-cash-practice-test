import { DataSource } from 'typeorm';

import { migrationsOrmConfig } from './migrationOrmConfig';

export const datasource = new DataSource({
  type: 'postgres',
  host: migrationsOrmConfig.POSTGRES_HOST,
  port: migrationsOrmConfig.POSTGRES_PORT,
  username: migrationsOrmConfig.POSTGRES_USER,
  password: migrationsOrmConfig.POSTGRES_PASSWORD,
  database: migrationsOrmConfig.POSTGRES_DB,
  logging: true,
  entities: [__dirname + '/../../../modules/**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  extra: {
    charset: 'uft8mb4_unicode_ci',
  },
});
