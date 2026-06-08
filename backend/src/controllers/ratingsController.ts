import type { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.rating.findMany();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch ratings' });
  }
};

export const getRecordById = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  if (!id || isNaN(Number(id))) {
    res.status(400).json({ error: 'Invalid user ID' });
    return;
  }
  try {
    const data = await prisma.rating.findUnique({
      where: { id: parseInt(id) },
    });
    if (!data) {
      res.status(404).json({ error: 'Rating not found' });
      return;
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch rating' });
  }
};

export const createRecord = async (req: Request, res: Response) => {
  try {
    const { userId, boothId, numStars } = req.body;

    if (!userId || !boothId || numStars === undefined) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    if (numStars < 1 || numStars > 5) {
      res.status(400).json({ error: 'numStars must be between 1 and 5' });
      return;
    }

    const data = await prisma.rating.create({
      data: {
        userId: parseInt(userId),
        boothId: parseInt(boothId),
        numStars: parseInt(numStars),
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create rating' });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  if (!id || isNaN(Number(id))) {
    res.status(400).json({ error: 'Invalid user ID' });
    return;
  }

  try {
    const { numStars } = req.body;

    if (numStars !== undefined && (numStars < 1 || numStars > 5)) {
      res.status(400).json({ error: 'numStars must be between 1 and 5' });
      return;
    }

    const updateData: any = {};
    if (numStars !== undefined) updateData.numStars = parseInt(numStars);

    const data = await prisma.rating.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update rating' });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  
  if (!id || isNaN(Number(id))) {
    res.status(400).json({ error: 'Invalid user ID' });
    return;
  }

  try {
    await prisma.rating.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Rating deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete rating' });
  }
};
