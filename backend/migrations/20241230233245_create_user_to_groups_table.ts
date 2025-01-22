import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    try {
        await knex.schema.createTable('user_to_groups', (table) => {
            table.increments('id').primary();
            table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
            table.integer('group_id').notNullable().references('group_id').inTable('groups').onDelete('CASCADE');
            table.timestamp('joined_at').defaultTo(knex.fn.now());
        });
    } catch (error) {
        console.error('Error creating user_to_groups Table:', error);
    }
    
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('user_to_groups');
}