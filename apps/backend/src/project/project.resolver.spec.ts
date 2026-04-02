import { type Organization, OrganizationType, type Project } from '@generated/prisma-client';
import { Test, type TestingModule } from '@nestjs/testing';
import { OrganizationService } from '../organization/organization.service';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';

describe('ProjectResolver', () => {
  let resolver: ProjectResolver;
  let projectService: { findAll: jest.Mock; findById: jest.Mock; create: jest.Mock };
  let organizationService: { findById: jest.Mock };

  beforeEach(async () => {
    projectService = { findAll: jest.fn(), findById: jest.fn(), create: jest.fn() };
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

  describe('project', () => {
    it('returns the project when it exists', async () => {
      const project = { id: '1', name: 'Project A', organizationId: 'org-1' };
      projectService.findById.mockResolvedValue(project);

      const result = await resolver.project('1');

      expect(result).toEqual(project);
      expect(projectService.findById).toHaveBeenCalledWith('1');
    });

    it('returns null when the project does not exist', async () => {
      projectService.findById.mockResolvedValue(null);

      const result = await resolver.project('missing');

      expect(result).toBeNull();
    });
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
      const org: Organization = { id: 'org-1', name: 'Acme', type: OrganizationType.DEVELOPER };
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
