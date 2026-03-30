import type { Organization, Project } from '@generated/prisma-client';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { OrganizationService } from './organization.service';

@Resolver('Organization')
export class OrganizationResolver {
  constructor(private readonly organizationService: OrganizationService) {}

  @Query('organization')
  organization(@Args('id') id: string): Promise<Organization | null> {
    return this.organizationService.findById(id);
  }

  @ResolveField('projects')
  projects(@Parent() org: Organization): Promise<Project[]> {
    return this.organizationService.findProjectsByOrganizationId(org.id);
  }
}
