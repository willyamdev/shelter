import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

const typeOrmConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  // autoLoadEntities: true,
  entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '../migrations/*{.ts,.js}')],
  synchronize: false,
  ssl: process.env.DATABASE_SSL === 'true',
  cli: {
    migrationsDir: 'src/migrations/',
  },
});

export default typeOrmConfig;
