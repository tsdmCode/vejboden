import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'no token' });
  }

  const decodedToken = verifyToken(token as string);

  if (!decodedToken) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  req.user = { id: decodedToken.id, role: decodedToken.role } as any;
  next();
};
