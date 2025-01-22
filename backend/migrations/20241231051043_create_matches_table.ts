import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('matches', (table) => {
        table.increments('match_id').primary();
        table.integer('group_id').unsigned().references('group_id').inTable('groups').onDelete('CASCADE');
        table.integer('winner_id').unsigned().references('id').inTable('users').onDelete('SET NULL');
        table.integer('loser_id').unsigned().references('id').inTable('users').onDelete('SET NULL');
        table.integer('balls_left').unsigned().nullable();
        table.timestamp('date_posted').defaultTo(knex.fn.now());

        table.check('winner_id != loser_id');
        table.check('balls_left >= 0');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('matches');
}