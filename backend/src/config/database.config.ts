// src/config/database.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig = (): TypeOrmModuleOptions => {
  // Lấy giá trị và có default fallback (tránh undefined)
  const host = process.env.DB_HOST ?? 'localhost';
  const port = Number(process.env.DB_PORT) || 3306;
  const username = process.env.DB_USERNAME ?? 'root';
  const password = process.env.DB_PASSWORD ?? '';
  const database = process.env.DB_DATABASE ?? 'kthp_nest';

  return {
    type: 'mysql',
    host,
    port,
    username,
    password,
    database,
    autoLoadEntities: true,
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: process.env.DB_LOGGING === 'true',
  };
};