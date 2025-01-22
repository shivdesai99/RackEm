import express, { Request, Response } from 'express';
import {
    getGroupByJoinCode,
    getAllGroups,
    getGroupById,
    getGroupLeaderboard
} from '../db/groupQueries';
import {
    isUserInGroup,
    addUserToGroup,
    getUserGroups,
    getMemberCountInGroup
} from '../db/userToGroupQueries';
import verifyToken, { AuthenticatedRequest } from '../middleware/verifyToken';

const router = express.Router();

// POST /group/join - Allow a user to join a group using a join code
router.post('/join', verifyToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { joinCode } = req.body;
    const userId = req.user?.id;

    if (!joinCode || !userId) {
        res.status(400).json({ message: 'Join code and user ID are required.' });
        return;
    }

    try {
        const group = await getGroupByJoinCode(joinCode);
        if (!group) {
            res.status(400).json({ message: 'Invalid join code.' });
            return;
        }

        const isMember = await isUserInGroup(userId, group.group_id);
        if (isMember) {
            res.status(409).json({ message: 'You are already a member of this group.' });
            return;
        }

        await addUserToGroup(userId, group.group_id);

        res.status(200).json({ message: 'Successfully joined the group.', group });
        return;
    } catch (error) {
        console.error('Error joining group:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
        return;
    }
});

// GET /group/my-groups - Fetch groups the user is part of
router.get('/my-groups', verifyToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;

    if (!userId) {
        res.status(400).json({ message: 'User ID is required.' });
        return;
    }

    try {
        console.log('Fetching user groups for user ID:', userId);

        const groups = await getUserGroups(userId);

        const groupsWithCounts = await Promise.all(
            groups.map(async (group) => {
                const memberCount = await getMemberCountInGroup(group.group_id);
                return {
                    ...group,
                    member_count: memberCount,
                };
            })
        );

        res.status(200).json({ myGroups: groupsWithCounts });
        return;
    } catch (error) {
        console.error('Error fetching user groups:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
        return;
    }
});

// GET /group/all-groups - Fetch all groups using getAllGroups
router.get('/all-groups', verifyToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        console.log('Fetching all groups with member counts.');
        const groups = await getAllGroups();
        res.status(200).json({ groups });
        return;
    } catch (error) {
        console.error('Error fetching all groups:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
        return;
    }
});

// GET /group/:groupId - Fetch metadata for a specific group
router.get('/:groupId', verifyToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { groupId } = req.params;

    if (!groupId) {
        res.status(400).json({ message: 'Group ID is required.' });
        return;
    }

    try {
        console.log('Fetching group metadata for group ID:', groupId);
        const group = await getGroupById(Number(groupId));
        if (!group) {
            res.status(404).json({ message: 'Group not found.' });
            return;
        }

        res.status(200).json({ group });
        return;
    } catch (error) {
        console.error('Error fetching group metadata:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
        return;
    }
});

/**
 * GET /group/:groupId/leaderboard
 * Get the leaderboard for a specific group.
 */
router.get(
    '/:groupId/leaderboard',
    verifyToken,
    async (req: Request, res: Response): Promise<void> => {
        const { groupId } = req.params;

        try {
            const groupIdNum = Number(groupId);

            const leaderboard = await getGroupLeaderboard(groupIdNum);

            res.status(200).json(leaderboard);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            res.status(500).json({ message: 'Failed to fetch leaderboard.' });
        }
    }
);

export default router;
