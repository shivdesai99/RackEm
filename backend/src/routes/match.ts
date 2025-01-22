import express, { Response } from 'express';
import { check, validationResult } from 'express-validator';
import { addMatch } from '../db/matchQueries';
import verifyToken, { AuthenticatedRequest } from '../middleware/verifyToken';

const router = express.Router();

/**
 * POST /matches
 * Create a new match between two users.
 */
router.post(
    '/',
    verifyToken, // Authenticate the user
    [
        check('groupId')
            .isInt().withMessage('Group ID must be an integer.')
            .toInt(),
        check('winnerId')
            .isInt().withMessage('Winner ID must be an integer.')
            .toInt(),
        check('loserId')
            .isInt().withMessage('Loser ID must be an integer.')
            .toInt()
            .custom((value, { req }) => value !== req.body.winnerId)
            .withMessage('Winner and Loser IDs must be different.'),
        check('ballsLeft')
            .optional()
            .isInt({ min: 0 }).withMessage('Balls left must be a positive integer.')
    ],
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return
        }

        const { groupId, winnerId, loserId, ballsLeft } = req.body;

        try {

            const match = await addMatch(groupId, winnerId, loserId, ballsLeft || null);
            res.status(201).json({
                message: 'Match successfully created.',
                match
            });
        } catch (error) {
            console.error('Error creating match:', error);
            res.status(500).json({ message: 'Failed to create match.' });
        }
    }
);


export default router;
