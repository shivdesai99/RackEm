import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // await knex("matches").truncate();

    await knex("matches").insert([
        {
            group_id: 1,
            winner_id: 1,
            loser_id: 2,
            balls_left: 3,
            date_posted: knex.fn.now(),
        },
        {
            group_id: 1,
            winner_id: 2,
            loser_id: 3,
            balls_left: 5,
            date_posted: knex.fn.now(),
        },
        {
            group_id: 1,
            winner_id: 3,
            loser_id: 1,
            balls_left: null,
            date_posted: knex.fn.now(),
        },
        {
            group_id: 1,
            winner_id: 1,
            loser_id: 3,
            balls_left: 2,
            date_posted: knex.fn.now(),
        },
    ]);
}
