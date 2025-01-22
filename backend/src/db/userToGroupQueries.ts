import knex from './knex_db';

export const isUserInGroup = async (userId: number, groupId: number) => {
    try {
        const mapping = await knex('user_to_groups')
            .where({ user_id: userId, group_id: groupId })
            .first();
        return !!mapping;
    } catch (error) {
        console.error('Error checking user membership:', error);
        throw new Error('Could not verify membership');
    }
};

export const getUserGroups = async (userId: number) => {
    try {
        const groups = await knex('user_to_groups')
            .join('groups', 'user_to_groups.group_id', '=', 'groups.group_id')
            .select(
                'groups.group_id',
                'groups.name',
                'groups.sport',
                'groups.join_code',
                'groups.created_at',
                'groups.updated_at'
            )
            .where({ 'user_to_groups.user_id': userId });

        return groups;
    } catch (error) {
        console.error('Error fetching groups for user:', error);
        throw new Error('Could not fetch user groups');
    }
};

export const getUsersInGroup = async (groupId: number) => {
    try {
        const users = await knex('user_to_groups')
            .join('users', 'user_to_groups.user_id', '=', 'users.id')
            .select('users.id', 'users.name', 'users.email')
            .where({ group_id: groupId });
        return users;
    } catch (error) {
        console.error('Error fetching users in group:', error);
        throw new Error('Could not fetch users');
    }
};

export const addUserToGroup = async (userId: number, groupId: number) => {
    try {
        await knex('user_to_groups').insert({ user_id: userId, group_id: groupId });
    } catch (error) {
        console.error('Error adding user to group:', error);
        throw new Error('Could not add user to group');
    }
};

export const removeUserFromGroup = async (userId: number, groupId: number) => {
    try {
        await knex('user_to_groups')
            .where({ user_id: userId, group_id: groupId })
            .del();
    } catch (error) {
        console.error('Error removing user from group:', error);
        throw new Error('Could not remove user from group');
    }
};

/**
 * Get the count of members in a group.
 * @param groupId - The ID of the group.
 * @returns The number of members in the group.
 */
export const getMemberCountInGroup = async (groupId: number): Promise<number> => {
    try {
        const [{ member_count }] = await knex('user_to_groups')
            .where({ group_id: groupId })
            .count('* as member_count');
        return member_count as number;
    } catch (error) {
        console.error('Error fetching member count for group:', error);
        throw new Error('Could not fetch member count');
    }
};
