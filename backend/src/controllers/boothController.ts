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
  try {
    const { id } = req.params;
    const data = await prisma.booth.findUnique({
      where: { id: parseInt(id) }
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
    console.log('POST /api/booths body:', req.body);
    const { name, products, location, openingHours, image, owner_id, latitude, longitude } = req.body || {};

    if (!name || latitude === undefined || longitude === undefined) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const parsedOwnerId = owner_id !== undefined && owner_id !== null ? parseInt(owner_id, 10) : null;
    const ownerId = Number.isNaN(parsedOwnerId) ? null : parsedOwnerId;

    const boothData: any = {
      name,
      products: products || '',
      location: location || '',
      openingHours: openingHours || '',
      image: image || '',
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };

    if (ownerId !== null) {
      boothData.owner_id = ownerId;
    }

    const data = await prisma.booth.create({
      data: boothData,
    });
    res.json(data);
  } catch (error) {
    console.error('Failed to create booth:', error);
    res.status(500).json({ error: 'Failed to create booth' });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, products, location, openingHours, image, latitude, longitude } = req.body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (products) updateData.products = products;
    if (location) updateData.location = location;
    if (openingHours) updateData.openingHours = openingHours;
    if (image) updateData.image = image;
    if (latitude !== undefined) updateData.latitude = parseFloat(latitude);
    if (longitude !== undefined) updateData.longitude = parseFloat(longitude);

    const data = await prisma.booth.update({
      where: { id: parseInt(id) },
      data: updateData
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update booth' });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.booth.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: 'Booth deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete booth' });
  }
};
