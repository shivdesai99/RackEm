import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // await knex("user_to_groups").truncate();

    await knex("user_to_groups").insert([
        {
            user_id: 1,
            group_id: 1,
            joined_at: new Date(),
        },
        {
            user_id: 2,
            group_id: 1,
            joined_at: new Date(),
        },
    ]);
}
