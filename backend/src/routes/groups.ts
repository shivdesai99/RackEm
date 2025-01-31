import express, { Response } from "express";
import { getGroupByJoinCode, getAllGroups } from "../db/groupQueries";
import {
    isUserInGroup,
    addUserToGroup,
    getUserGroups,
    getMemberCountInGroup,
} from "../db/userToGroupQueries";
import verifyToken, { AuthenticatedRequest } from "../middleware/verifyToken";

const router = express.Router();

// POST /groups/join - Allow a user to join a group using a join code
router.post(
    "/join",
    verifyToken,
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const { joinCode } = req.body;
        const userId = req.user?.id;

        if (!joinCode || !userId) {
            res.status(400).json({
                message: "Join code and user ID are required.",
            });
            return;
        }

        try {
            const group = await getGroupByJoinCode(joinCode);
            if (!group) {
                res.status(400).json({ message: "Invalid join code." });
                return;
            }

            const isMember = await isUserInGroup(userId, group.group_id);
            if (isMember) {
                res.status(409).json({
                    message: "You are already a member of this group.",
                });
                return;
            }

            await addUserToGroup(userId, group.group_id);

            res.status(200).json({
                message: "Successfully joined the group.",
                group,
            });
            return;
        } catch (error) {
            console.error("Error joining group:", error);
            res.status(500).json({
                message: "Server error. Please try again later.",
            });
            return;
        }
    }
);

// GET /group/my-groups - Fetch groups the user is part of
router.get(
    "/my-groups",
    verifyToken,
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const userId = req.user?.id;

        if (!userId) {
            res.status(400).json({ message: "User ID is required." });
            return;
        }

        try {
            console.log("Fetching user groups for user ID:", userId);

            const groups = await getUserGroups(userId);

            const groupsWithCounts = await Promise.all(
                groups.map(async (group) => {
                    const member_count = await getMemberCountInGroup(group.id);
                    return {
                        ...group,
                        memberCount: member_count,
                    };
                })
            );

            res.status(200).json({ myGroups: groupsWithCounts });
            return;
        } catch (error) {
            console.error("Error fetching user groups:", error);
            res.status(500).json({
                message: "Server error. Please try again later.",
            });
            return;
        }
    }
);

// GET /group/all-groups - Fetch all groups using getAllGroups
router.get(
    "/all-groups",
    verifyToken,
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const groups = await getAllGroups();
            console.log(
                "Fetched all groups from getAllGroups endpoint:",
                groups
            );
            res.status(200).json({ groups });
            return;
        } catch (error) {
            console.error("Error fetching all groups:", error);
            res.status(500).json({
                message: "Server error. Please try again later.",
            });
            return;
        }
    }
);

export default router;
