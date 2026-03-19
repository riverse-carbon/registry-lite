import { Test, type TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { OrganizationService } from './organization.service';

describe('OrganizationService', () => {
  let service: OrganizationService;
  let prisma: { organization: { findUnique: jest.Mock } };

  beforeEach(async () => {
    prisma = { organization: { findUnique: jest.fn() } };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<OrganizationService>(OrganizationService);
  });

  it('returns the organization for a given id', async () => {
    const org = { id: 'org-1', name: 'Acme' };
    prisma.organization.findUnique.mockResolvedValue(org);

    const result = await service.findById('org-1');

    expect(result).toEqual(org);
    expect(prisma.organization.findUnique).toHaveBeenCalledWith({
      where: { id: 'org-1' },
    });
  });

  it('returns null when the organization is not found', async () => {
    prisma.organization.findUnique.mockResolvedValue(null);

    const result = await service.findById('unknown-id');

    expect(result).toBeNull();
  });
});
