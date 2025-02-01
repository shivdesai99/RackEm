import knex from "../config/knex_db";

export const getGroupByJoinCode = async (joinCode: string) => {
    try {
        const group = await knex("groups")
            .where({ join_code: joinCode })
            .first();
        return group;
    } catch (error) {
        console.error("Error fetching group by join code:", error);
        throw new Error("Could not fetch group");
    }
};

export const getGroupById = async (groupId: number) => {
    try {
        console.log("groupId:", groupId);
        const group = await knex("groups").where({ group_id: groupId }).first();
        return group;
    } catch (error) {
        console.error("Error fetching group by ID:", error);
        throw new Error("Could not fetch group");
    }
};

export const addGroup = async (
    name: string,
    sport: string,
    joinCode: string
) => {
    try {
        const [groupId] = await knex("groups").insert(
            { name, sport, join_code: joinCode },
            ["group_id"]
        );
        return groupId;
    } catch (error) {
        console.error("Error adding group:", error);
        throw new Error("Could not add group");
    }
};

/**
 * Get all groups with their respective member counts.
 * @returns Array of groups with member counts.
 */
export const getAllGroups = async () => {
    try {
        const groups = await knex("groups")
            .leftJoin(
                "user_to_groups",
                "groups.group_id",
                "user_to_groups.group_id"
            )
            .select(
                "groups.group_id AS id",
                "groups.name AS name",
                "groups.sport AS sport",
                "groups.join_code AS joinCode",
                knex.raw(`COUNT(user_to_groups.user_id) AS "memberCount"`)
            )
            .groupBy("groups.group_id", "groups.name");
        return groups;
    } catch (error) {
        console.error("Error fetching all groups with member counts:", error);
        throw new Error("Could not fetch groups");
    }
};

/**
 * Get the leaderboard for a group.
 * @param groupId - The ID of the group.
 * @returns Array of users with their match statistics, sorted by wins in descending order.
 */
export const getGroupLeaderboard = async (groupId: number) => {
    try {
        const leaderboard = await knex("matches")
            .select(
                "users.id as user_id",
                "users.name",
                knex.raw(
                    "COUNT(CASE WHEN matches.winner_id = users.id THEN 1 END) as wins"
                ),
                knex.raw(
                    "COUNT(CASE WHEN matches.loser_id = users.id THEN 1 END) as losses"
                ),
                knex.raw("COUNT(*) as total_matches")
            )
            .join("users", function () {
                this.on("matches.winner_id", "=", "users.id").orOn(
                    "matches.loser_id",
                    "=",
                    "users.id"
                );
            })
            .where("matches.group_id", groupId)
            .groupBy("users.id", "users.name")
            .orderBy("wins", "desc");

        return leaderboard;
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        throw new Error("Could not fetch leaderboard");
    }
};
