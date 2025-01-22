import knex from './knex_db';

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
        const [match] = await knex('matches')
            .insert({
                group_id: groupId,
                winner_id: winnerId,
                loser_id: loserId,
                balls_left: ballsLeft,
                date_posted: knex.fn.now()
            })
            .returning(['match_id', 'group_id', 'winner_id', 'loser_id', 'balls_left', 'date_posted']);
        return match;
    } catch (error) {
        console.error('Error adding match:', error);
        throw new Error('Could not add match');
    }
};