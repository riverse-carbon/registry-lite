import type { Organization, Project } from '@generated/prisma-client';
import { Test, type TestingModule } from '@nestjs/testing';
import { OrganizationService } from '../organization/organization.service';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';

describe('ProjectResolver', () => {
  let resolver: ProjectResolver;
  let projectService: { findAll: jest.Mock; create: jest.Mock };
  let organizationService: { findById: jest.Mock };

  beforeEach(async () => {
    projectService = { findAll: jest.fn(), create: jest.fn() };
    organizationService = { findById: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectResolver,
        { provide: ProjectService, useValue: projectService },
        { provide: OrganizationService, useValue: organizationService },
      ],
    }).compile();

    resolver = module.get<ProjectResolver>(ProjectResolver);
  });

  describe('projects', () => {
    it('returns all projects', async () => {
      const projects = [{ id: '1', name: 'Project A', organizationId: 'org-1' }];
      projectService.findAll.mockResolvedValue(projects);

      const result = await resolver.projects();

      expect(result).toEqual(projects);
    });
  });

  describe('organization', () => {
    it('resolves the organization for a project', async () => {
      const project: Project = { id: '1', name: 'Project A', organizationId: 'org-1' };
      const org: Organization = { id: 'org-1', name: 'Acme', type: 'DEVELOPER' };
      organizationService.findById.mockResolvedValue(org);

      const result = await resolver.organization(project);

      expect(result).toEqual(org);
      expect(organizationService.findById).toHaveBeenCalledWith('org-1');
    });

    it('returns null when the organization is not found', async () => {
      const project: Project = { id: '1', name: 'Project A', organizationId: 'missing-org' };
      organizationService.findById.mockResolvedValue(null);

      const result = await resolver.organization(project);

      expect(result).toBeNull();
    });
  });

  describe('createProject', () => {
    it('creates a project and returns it', async () => {
      const input = { name: 'New Project', organizationId: 'org-1' };
      const created = { id: 'proj-new', name: 'New Project', organizationId: 'org-1' };
      projectService.create.mockResolvedValue(created);

      const result = await resolver.createProject(input);

      expect(result).toEqual(created);
      expect(projectService.create).toHaveBeenCalledWith(input);
    });
  });
});
