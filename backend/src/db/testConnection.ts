import db from './knex_db';

const testConnection = async (): Promise<void> => {
console.log('Starting test connection...');

try {
    const result = await db.raw('SELECT NOW()');
    console.log('Database connected successfully. Current time:', result.rows[0].now);
} catch (error) {
    console.error('Error testing the database connection:', error);
} finally {
    await db.destroy();
    console.log('Knex connection pool closed.');
}
};

testConnection();