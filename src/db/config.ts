import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../**/{artist,album,user}.entity{.ts,.js}'],
  // migrations: ['src/db/migrations/**/*{.ts,.js}'],
  synchronize: true,
  logging: false,
};
