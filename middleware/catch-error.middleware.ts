import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

export const catchError = (handler: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(handler(req,res,next)).catch(next);
    }
}

export const notFoundRoute = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        message: 'This route is not found'
    })
}


export const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    console.error(err);  
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        message: err.message || "Đã có lỗi xảy ra!",
    });
};
