import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

function verifyToken(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies.accessToken; 
    if (!accessToken) {
        res.status(401).json({ message: "Unauthorized - No token provided" });
        return;
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as {userId: string}
        req.user = decoded.userId;
        next();
    } catch (error) {
        res.status(403).json({ message: "Forbidden - Invalid or expired token" });
        return;
    }
}

export default {
    verifyToken
}