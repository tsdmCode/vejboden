import type { Request, Response } from 'express';
import { prisma } from '../prisma.js';
import bcrypt from 'bcrypt';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.users.findMany();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'failed to fetch users' });
  }
};

export const createRecord = async (req: Request, res: Response) => {
    const {firstname, lastname, username, email, password, role} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)

    if (!firstname || !lastname || !username || !email || !password || !role) {
        console.error("Missing fields")
    }

    try {
        const data = await prisma.users.create({
            data: {
                firstname,
                lastname,
                username,
                email,
                password: hashedPassword,
                role
            }
        });
        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Failed to make user"})
    }
}