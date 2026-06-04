import { generateToken } from '../utils/jwt.js';
import { prisma } from '../prisma.js';
import bcrypt from "bcrypt";
import type { Request, Response } from 'express';

export const googleCallback = (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication failed' });
  }

  const userToken = generateToken({ id: req.user.id, role: req.user.role });

  res.json({ userToken, user: req.user });
};


export const login = async (req: Request, res: Response) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ error: 'Missing email/username or password' });
  }

  try {
    const user = await prisma.users.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });

    if (!user || !user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const userToken = generateToken({ id: user.id, role: user.role });
    const { password: _, ...safeUser } = user; //her fjerner vi password delen fra det vi returnerer

    return res.json({ userToken, user: safeUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Login failed' });
  }
};

export const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
};