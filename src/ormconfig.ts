import * as path from 'path';

export default {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  migrations: [path.join(__dirname, '/migrations/*{.ts,.js}')],
  entities: [path.join(__dirname, '/**/**/*.entity{.ts,.js}')],
  synchronize: false,
  ssl: process.env.DATABASE_SSL === 'true',
  cli: {
    migrationsDir: 'src/migrations/',
  },
};
