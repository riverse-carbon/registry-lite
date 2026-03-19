import { PrismaClient } from '@generated/prisma-client/index.js';

const prisma = new PrismaClient();

async function main() {
  const orgA = await prisma.organization.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Org A',
      projects: {
        create: {
          id: '00000000-0000-0000-0000-000000000011',
          name: 'Proj A',
        },
      },
    },
  });

  const orgB = await prisma.organization.upsert({
    where: { id: '00000000-0000-0000-0000-000000000002' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000002',
      name: 'Org B',
      projects: {
        create: {
          id: '00000000-0000-0000-0000-000000000012',
          name: 'Proj B',
        },
      },
    },
  });

  console.log({ orgA, orgB });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
