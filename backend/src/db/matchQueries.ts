import knex from "./knex_db";

/**
 * Add a match to the database.
 * @param groupId - The ID of the group where the match occurred.
 * @param winnerId - The ID of the winning user.
 * @param loserId - The ID of the losing user.
 * @param ballsLeft - Optional number of balls left for the winner.
 * @returns The inserted match details.
 */
export const addMatch = async (
    groupId: number,
    winnerId: number,
    loserId: number,
    ballsLeft: number | null
) => {
    try {
        const [match] = await knex("matches")
            .insert({
                group_id: groupId,
                winner_id: winnerId,
                loser_id: loserId,
                balls_left: ballsLeft,
                date_posted: knex.fn.now(),
            })
            .returning([
                "match_id",
                "group_id",
                "winner_id",
                "loser_id",
                "balls_left",
                "date_posted",
            ]);
        return match;
    } catch (error) {
        console.error("Error adding match:", error);
        throw new Error("Could not add match");
    }
};

/**
 * Get all matches for a specific group ordered by the most recent match first.
 * Fetches the winner and loser names by joining with the users table.
 *
 * @param groupId - The ID of the group whose matches are being fetched.
 * @returns An array of match details ordered by date_posted in descending order.
 */
export const getGameLog = async (groupId: number) => {
    try {
        const matches = await knex("matches")
            .select([
                "matches.match_id",
                "matches.group_id",
                "matches.winner_id",
                "matches.loser_id",
                "matches.balls_left",
                "matches.date_posted",
                "winner.name as winner_name", // Fetch winner's name
                "loser.name as loser_name", // Fetch loser's name
            ])
            .leftJoin("users as winner", "matches.winner_id", "winner.id")
            .leftJoin("users as loser", "matches.loser_id", "loser.id")
            .where("matches.group_id", groupId)
            .orderBy("matches.date_posted", "desc");

        return matches;
    } catch (error) {
        console.error("Error fetching matches for group:", error);
        throw new Error("Could not fetch matches for the specified group");
    }
};
