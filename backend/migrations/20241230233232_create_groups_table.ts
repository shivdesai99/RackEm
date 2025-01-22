import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    try {
        await knex.schema.createTable('groups', (table) => {
            table.increments('group_id').primary();
            table.string('name').notNullable().unique();
            table.string('sport').notNullable();
            table.string('join_code').notNullable().unique();
            table.timestamps(true, true);
        });
    } catch (error) {
        console.error('Error creating groups Table:', error);
    }
    
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('groups');
}