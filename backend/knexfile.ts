  import { Knex } from 'knex';
  import * as path from 'path';
  import * as dotenv from 'dotenv';

  const envPath =
    process.env.NODE_ENV === 'production'
      ? path.resolve(__dirname, '../.env') // For dist
      : path.resolve(__dirname, './.env'); // For src

  dotenv.config({ path: envPath });


  const config: { [key: string]: Knex.Config } = {
    development: {
      client: 'pg',
      connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        ssl: false,
      },
      migrations: {
        directory: './migrations',
        extension: 'ts',
      },
      seeds: {
        directory: './seeds',
      },
    },
    production: {
      client: 'pg',
      connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      },
      migrations: {
        directory: path.resolve(__dirname, './migrations'),
        extension: 'js',
      },
      seeds: {
        directory: path.resolve(__dirname, './seeds'),
      },
    },
  };

  export default config;
