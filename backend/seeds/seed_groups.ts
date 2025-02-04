import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("groups").insert([
        {
            name: "SAM Pool",
            sport: "Pool",
            join_code: "SAM",
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]);
}
