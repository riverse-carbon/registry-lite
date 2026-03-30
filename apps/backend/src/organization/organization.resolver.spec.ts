import { Test, type TestingModule } from '@nestjs/testing';
import type { Organization } from './organization.model';
import { OrganizationResolver } from './organization.resolver';
import { OrganizationService } from './organization.service';

describe('OrganizationResolver', () => {
  let resolver: OrganizationResolver;
  let organizationService: {
    findById: jest.Mock;
    findProjectsByOrganizationId: jest.Mock;
  };

  beforeEach(async () => {
    organizationService = {
      findById: jest.fn(),
      findProjectsByOrganizationId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationResolver,
        { provide: OrganizationService, useValue: organizationService },
      ],
    }).compile();

    resolver = module.get<OrganizationResolver>(OrganizationResolver);
  });

  describe('organization query', () => {
    it('returns the organization for a given id', async () => {
      const org: Organization = { id: 'org-1', name: 'Acme' };
      organizationService.findById.mockResolvedValue(org);

      const result = await resolver.organization('org-1');

      expect(result).toEqual(org);
      expect(organizationService.findById).toHaveBeenCalledWith('org-1');
    });

    it('returns null when the organization is not found', async () => {
      organizationService.findById.mockResolvedValue(null);

      const result = await resolver.organization('unknown');

      expect(result).toBeNull();
    });
  });

  describe('projects resolve field', () => {
    it('returns the projects for the parent organization', async () => {
      const projects = [{ id: 'proj-1', name: 'Solar Farm', organizationId: 'org-1' }];
      organizationService.findProjectsByOrganizationId.mockResolvedValue(projects);
      const org: Organization = { id: 'org-1', name: 'Acme' };

      const result = await resolver.projects(org);

      expect(result).toEqual(projects);
      expect(organizationService.findProjectsByOrganizationId).toHaveBeenCalledWith('org-1');
    });
  });
});
