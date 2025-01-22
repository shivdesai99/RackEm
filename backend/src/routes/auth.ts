import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/knex_db';
import verifyToken, { AuthenticatedRequest } from '../middleware/verifyToken';

const router = express.Router();

router.post('/register', async (req: Request, res: Response): Promise<void> => {
    const { email, password, name } = req.body;
  
    try {
        const existingUser = await db('users').where({ email }).first();
        if (existingUser) {
            res.status(400).json({ message: 'Email is already in use.' });
            return;
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const [newUserId] = await db('users').insert(
            {
              email,
              password_hash: passwordHash,
              name,
            },
            ['id']
          );
        const token = jwt.sign(
            { id: newUserId.id, email: newUserId.email, name: newUserId.name },
            process.env.JWT_SECRET as string,
            { expiresIn: '30d' }
        );
        res.status(201).json({
        message: 'User registered successfully.',
        token,
        user: {
            id: newUserId,
            email,
            name,
        },
        });
          
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});
  

router.post('/login', async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required.' });
            return 
        }

        const user = await db('users').where({ email }).first();
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return 
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid credentials.' });
            return 
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            process.env.JWT_SECRET as string,
            { expiresIn: '30d' }
        );

        res.status(200).json({
            message: 'Login successful.',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

router.get('/protected', verifyToken, (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    res.status(200).json({
        message: 'Access to protected route granted.',
        user,
    });
});

router.get('/me', verifyToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const user = req.user;
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        res.status(200).json({
            message: 'User details fetched successfully.',
            user,
        });

    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

export default router;