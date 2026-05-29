import { generateToken } from '../utils/jwt.js';
import type { Request, Response } from 'express';

export const googleCallback = (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication failed' });
  }

  const userToken = generateToken({ id: req.user.id, role: req.user.role });

  res.json({ userToken, user: req.user });
};

export const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
};