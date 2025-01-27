import express, { Request, Response } from "express";
import { getGroupById, getGroupLeaderboard } from "../db/groupQueries";
import { getGameLog } from "../db/matchQueries";
import { check, validationResult } from "express-validator";
import { addMatch } from "../db/matchQueries";
import verifyToken, { AuthenticatedRequest } from "../middleware/verifyToken";

const router = express.Router();

// GET /group/:groupId - Fetch metadata for a specific group
router.get(
    "/:groupId",
    verifyToken,
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const { groupId } = req.params;

        if (!groupId) {
            res.status(400).json({ message: "Group ID is required." });
            return;
        }

        try {
            console.log("Fetching group metadata for group ID:", groupId);
            const group = await getGroupById(Number(groupId));
            if (!group) {
                res.status(404).json({ message: "Group not found." });
                return;
            }

            res.status(200).json({ group });
            return;
        } catch (error) {
            console.error("Error fetching group metadata:", error);
            res.status(500).json({
                message: "Server error. Please try again later.",
            });
            return;
        }
    }
);

/**
 * GET /group/:groupId/leaderboard
 * Get the leaderboard for a specific group.
 */
router.get(
    "/:groupId/leaderboard",
    verifyToken,
    async (req: Request, res: Response): Promise<void> => {
        const { groupId } = req.params;

        try {
            const groupIdNum = Number(groupId);

            const leaderboard = await getGroupLeaderboard(groupIdNum);

            res.status(200).json(leaderboard);
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
            res.status(500).json({ message: "Failed to fetch leaderboard." });
        }
    }
);

/**
 * GET /group/:groupId/gamelog
 * Get the game log for a specific group.
 */
router.get(
    "/:groupId/gamelog",
    verifyToken,
    async (req: Request, res: Response): Promise<void> => {
        const { groupId } = req.params;

        if (!groupId) {
            res.status(400).json({ message: "Group ID is required." });
            return;
        }

        try {
            const groupIdNum = Number(groupId);

            console.log("Fetching game log for group ID:", groupIdNum);
            const gameLog = await getGameLog(groupIdNum);

            if (!gameLog.length) {
                res.status(404).json({
                    message: "No matches found for this group.",
                });
                return;
            }

            res.status(200).json(gameLog);
        } catch (error) {
            console.error("Error fetching game log:", error);
            res.status(500).json({ message: "Failed to fetch game log." });
        }
    }
);

router.post(
    "/:groupId/match",
    verifyToken, // Authenticate the user
    [
        check("groupId")
            .isInt()
            .withMessage("Group ID must be an integer.")
            .toInt(),
        check("winnerId")
            .isInt()
            .withMessage("Winner ID must be an integer.")
            .toInt(),
        check("loserId")
            .isInt()
            .withMessage("Loser ID must be an integer.")
            .toInt()
            .custom((value, { req }) => value !== req.body.winnerId)
            .withMessage("Winner and Loser IDs must be different."),
        check("ballsLeft")
            .optional()
            .isInt({ min: 0 })
            .withMessage("Balls left must be a positive integer."),
    ],
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { groupId, winnerId, loserId, ballsLeft } = req.body;

        try {
            const match = await addMatch(
                groupId,
                winnerId,
                loserId,
                ballsLeft || null
            );
            res.status(201).json({
                message: "Match successfully created.",
                match,
            });
        } catch (error) {
            console.error("Error creating match:", error);
            res.status(500).json({ message: "Failed to create match." });
        }
    }
);

export default router;
