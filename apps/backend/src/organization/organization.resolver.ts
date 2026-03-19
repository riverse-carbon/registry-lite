import { Args, ID, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Project } from '../project/project.model';
import { Organization } from './organization.model';
// biome-ignore lint/style/useImportType: NestJS DI requires a value import
import { OrganizationService } from './organization.service';

@Resolver(() => Organization)
export class OrganizationResolver {
  constructor(private readonly organizationService: OrganizationService) {}

  @Query(() => Organization, { nullable: true, name: 'organization' })
  organization(@Args('id', { type: () => ID }) id: string): Promise<Organization | null> {
    return this.organizationService.findById(id);
  }

  @ResolveField(() => [Project])
  projects(
    @Parent() org: Organization,
  ): Promise<{ id: string; name: string; organizationId: string }[]> {
    return this.organizationService.findProjectsByOrganizationId(org.id);
  }
}
