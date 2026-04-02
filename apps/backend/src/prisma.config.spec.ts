import prismaConfig from '../prisma.config';

describe('prisma.config', () => {
  it('defines a seed command for the database', () => {
    expect(prismaConfig.migrations?.seed).toBe('tsx prisma/seed.ts');
  });
});
