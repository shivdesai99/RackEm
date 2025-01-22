import knex from 'knex';
import config from '../../knexfile'; // Adjust path if needed

const environment = process.env.NODE_ENV || 'development';
const db = knex(config[environment]);

export default db;
