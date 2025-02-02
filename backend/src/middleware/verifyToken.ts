import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    user?: { id: number; email: string; name: string };
}

const verifyToken = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.error("Authorization header missing or invalid:", authHeader);
        res.status(401).json({
            message: "Access token is missing or invalid.",
        });
        return;
    }

    const token = authHeader.split(" ")[1];
    console.log("Headers received in request:", req.headers);
    console.log("Token extracted from header:", token);

    try {
        console.log("Verifying token:", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded as { id: number; email: string; name: string };
        console.log("Token successfully verified. User:", req.user);
        next();
    } catch (error) {
        if (error instanceof Error) {
            console.error("Token: ", token);
            console.error("Token verification failed:", error.message);
        }
        res.status(401).json({ message: "Invalid or expired token." });
        return;
    }
};

export default verifyToken;
