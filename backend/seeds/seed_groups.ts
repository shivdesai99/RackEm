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
        {
            name: "SAM Basketball",
            sport: "Basketball",
            join_code: "SAMBacketball",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            name: "SAM Soccer",
            sport: "Soccer",
            join_code: "SAMSoccer",
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]);
}
