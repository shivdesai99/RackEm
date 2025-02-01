import knex from "../config/knex_db";

/**
 * Search for users in a specific group by name.
 * @param groupId - The ID of the group to search within.
 * @param name - Partial or full name to search for.
 * @param excludeUserId - ID of the logged-in user to exclude from results.
 * @returns A list of matching users with their IDs and names.
 */
export const getUsersInGroup = async (
    groupId: number,
    name: string
): Promise<{ user_id: number; name: string; email: string }[]> => {
    try {
        const users = await knex("user_to_groups")
            .join("users", "user_to_groups.user_id", "=", "users.id")
            .select("users.id as user_id", "users.name", "users.email")
            .where("user_to_groups.group_id", groupId)
            .andWhere("users.name", "like", `%${name}%`)
            .orderBy("users.name", "asc")
            .limit(10);

        return users;
    } catch (error) {
        console.error("Error fetching users in group:", error);
        throw new Error("Could not fetch users");
    }
};
