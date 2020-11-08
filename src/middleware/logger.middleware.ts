import { Request, Response } from 'express';

export function loggerMiddleware(req: Request, res: Response, next: () => void) {
    console.log('hit:', req.hostname, req.ip);
   
    next();
};