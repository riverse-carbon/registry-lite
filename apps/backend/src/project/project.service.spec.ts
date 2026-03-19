import { Test, type TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;
  let prisma: { project: { findMany: jest.Mock; create: jest.Mock } };

  beforeEach(async () => {
    prisma = { project: { findMany: jest.fn(), create: jest.fn() } };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
  });

  describe('findAll', () => {
    it('returns all projects', async () => {
      const projects = [{ id: '1', name: 'Alpha', organizationId: 'org-1' }];
      prisma.project.findMany.mockResolvedValue(projects);

      const result = await service.findAll();

      expect(result).toEqual(projects);
    });
  });

  describe('create', () => {
    it('creates a project and returns it', async () => {
      const input = { name: 'New Project', organizationId: 'org-1' };
      const created = { id: 'proj-new', ...input };
      prisma.project.create.mockResolvedValue(created);

      const result = await service.create(input);

      expect(result).toEqual(created);
      expect(prisma.project.create).toHaveBeenCalledWith({ data: input });
    });
  });
});
