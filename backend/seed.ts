import { prisma } from './src/prisma.js';

async function main() {
  // Create default user if it doesn't exist
  const defaultUser = await prisma.users.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      firstname: 'Admin',
      lastname: 'User',
      username: 'admin',
      email: 'admin@vejboden.dk',
      password: 'admin123',
      role: 'ADMIN',
    },
  });

  console.log('Default user created/updated:', defaultUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
