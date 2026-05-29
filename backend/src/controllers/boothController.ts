import type { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.booth.findMany();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch booths' });
  }
};

export const getRecordById = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  try {
    const data = await prisma.booth.findUnique({
      where: { id: parseInt(id) },
    });
    if (!data) {
      res.status(404).json({ error: 'Booth not found' });
      return;
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch booth' });
  }
};

export const createRecord = async (req: Request, res: Response) => {
  try {
    const { name, products, owner_id, latitude, longitude } = req.body;

    if (!name || !owner_id || latitude === undefined || longitude === undefined) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const data = await prisma.booth.create({
      data: {
        name,
        products: products || [],
        owner_id: parseInt(owner_id),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create booth' });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  if (!id || isNaN(Number(id))) {
    res.status(400).json({ error: 'Invalid user ID' });
    return;
  }
  try {
    const { name, products, latitude, longitude } = req.body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (products) updateData.products = products;
    if (latitude !== undefined) updateData.latitude = parseFloat(latitude);
    if (longitude !== undefined) updateData.longitude = parseFloat(longitude);

    const data = await prisma.booth.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update booth' });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  if (!id || isNaN(Number(id))) {
    res.status(400).json({ error: 'Invalid booth ID' });
    return;
  }
  try {
    await prisma.booth.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Booth deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete booth' });
  }
};
