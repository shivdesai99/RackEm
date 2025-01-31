import express, { Response } from "express";
import { getUsersInGroup } from "../db/userQueries";
import { isUserInGroup } from "../db/userToGroupQueries";
import { check, validationResult } from "express-validator";
import verifyToken, { AuthenticatedRequest } from "../middleware/verifyToken";

const router = express.Router();

/**
 * GET /users/search
 * Search for users by name within a specific group.
 */
router.get(
    "/search",
    verifyToken,
    [
        check("groupId")
            .isInt()
            .withMessage("Group ID must be an integer.")
            .toInt(),
        check("name").isString().withMessage("Name must be a string."),
    ],
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { groupId, name } = req.query;

        try {
            // Validate group membership
            const isMember = await isUserInGroup(req.user!.id, Number(groupId));
            if (!isMember) {
                res.status(403).json({
                    message: "You do not have access to this group.",
                });
                return;
            }

            // Fetch users in the group matching the name
            const users = await getUsersInGroup(
                Number(groupId),
                name as string
            );
            res.status(200).json(users);
        } catch (error) {
            console.error("Error in /users/search route:", error);
            res.status(500).json({ message: "Failed to fetch users." });
        }
    }
);

export default router;
