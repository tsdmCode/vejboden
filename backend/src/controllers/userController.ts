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

export const getRecordById = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  
  if (!id || isNaN(Number(id))) {
    res.status(400).json({ error: 'Invalid user ID' });
    return;
  }
  try {
    const user = await prisma.users.findUnique({
      where: { id: Number(id) },
    });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const createRecord = async (req: Request, res: Response) => {
  const { firstname, lastname, username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  if (!firstname || !lastname || !username || !email || !password || !role) {
    console.error('Missing fields');
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const data = await prisma.users.create({
      data: {
        firstname,
        lastname,
        username,
        email,
        password: hashedPassword,
        role,
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to make user' });
  }
};
export const updateRecord = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  
  if (!id || isNaN(Number(id))) {
    res.status(400).json({ error: 'Invalid user ID' });
    return;
  }

  try {
    const { firstname, lastname, username, email, password, role } = req.body;

    const updateData: any = {};
    if (firstname) updateData.firstname = firstname;
    if (lastname) updateData.lastname = lastname;
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, 10);
    if (role) updateData.role = role;

    const data = await prisma.users.update({
      where: { id: Number(id) },
      data: updateData,
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  
  if (!id || isNaN(Number(id))) {
    res.status(400).json({ error: 'Invalid user ID' });
    return;
  }

  try {
    await prisma.users.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};