import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // console.log('Knex configuration:', knex.client.config.connection);
    await knex("users").truncate();
}
