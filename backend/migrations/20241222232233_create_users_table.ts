import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  try {
    await knex.schema.createTable('users', (table) => {
      table.increments('id').primary(); 
      table.string('email').notNullable().unique(); 
      table.string('password_hash').notNullable(); 
      table.string('name').notNullable(); 
      table.timestamps(true, true);
    });
    console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating users table:', error);
  }
}

export async function down(knex: Knex): Promise<void> {
  try {
    await knex.schema.dropTableIfExists('users');
    console.log('Table dropped successfully');
  } catch (error) {
    console.error('Error dropping table:', error);
  }
}
