import 'dotenv/config';
import fs from 'fs/promises';
import bcrypt from "bcrypt"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function parseCSV(path: string) {
  const txt = await fs.readFile(path, 'utf8');
  const lines = txt.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return [];
  const header = lines[0];
  if (!header) return [];
  const rows = lines.slice(1);
  const cols = header.split(',').map(c => c.trim());
  return rows.map(r => {
    // naive split on commas — good for simple CSV rows we provide
    const parts = r.split(',');
    const obj: Record<string, string> = {};
    for (let i = 0; i < cols.length; i++) {
      const key = cols[i];
      if (!key) continue;
      const val = parts[i] ?? '';
      obj[key] = val.replace(/^"|"$/g, '').trim();
    }
    return obj;
  });
}

async function main() {
  try {
    const usersPath = './prisma/seeds/users.csv';
    const boothsPath = './prisma/seeds/booths.csv';

    const usersRows = await parseCSV(usersPath);
    console.log(`Seeding ${usersRows.length} users...`);
    for (const u of usersRows) {
      const data: any = {
        firstname: u.firstname || '',
        lastname: u.lastname || '',
        username: u.username || `${u.firstname}_${u.lastname}`,
        email: u.email || '',
        password: u.password ? await bcrypt.hash(u.password, 10) : null,
        profilePicture: u.profilePicture || null,
        role: (u.role || 'USER') as any,
      };

      await prisma.users.upsert({
        where: { username: data.username },
        update: data,
        create: data,
      });
    }

    const boothsRows = await parseCSV(boothsPath);
    console.log(`Seeding ${boothsRows.length} booths...`);
    for (const b of boothsRows) {
      const ownerUsername = b.ownerUsername;
      let owner = null;
      if (ownerUsername) {
        owner = await prisma.users.findUnique({ where: { username: ownerUsername } });
      }

      const products = (b.products || '').split(';').map(p => p.trim()).filter(Boolean);

      const data: any = {
        name: b.name,
        products,
        owner_id: owner ? owner.id : undefined,
        latitude: b.latitude ? parseFloat(b.latitude) : 0,
        longitude: b.longitude ? parseFloat(b.longitude) : 0,
        openTimeWeekday: b.openTimeWeekday || null,
        closeTimeWeekday: b.closeTimeWeekday || null,
        openTimeWeekend: b.openTimeWeekend || null,
        closeTimeWeekend: b.closeTimeWeekend || null,
      };

      if (!data.owner_id) {
        console.warn(`Skipping booth '${data.name}' because owner '${ownerUsername}' not found.`);
        continue;
      }

      await prisma.booth.upsert({
        where: { name: data.name },
        update: data,
        create: data,
      });
    }

    console.log('Seeding complete.');
  } catch (err) {
    console.error('Seed failed:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
