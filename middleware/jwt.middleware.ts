import {Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

function verifyToken (req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        res.status(401).json({
            message: 'Unauthorized - no token provided'
        })
        return;
    }
    try {
        const decode = jwt.verify(
            accessToken, 
            process.env.JWT_SECRET!,
        ) as JwtPayload
        req.user = decode.userId
    } catch (error) {
        res.status(403).json({
            message: 'Forbidden - Invalid or expire token'
        })
    }
}

export default {
    verifyToken
}