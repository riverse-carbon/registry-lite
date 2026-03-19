import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Organization } from '../organization/organization.model';
import { OrganizationService } from '../organization/organization.service';
import { Project } from './project.model';
import { ProjectService } from './project.service';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(
    private readonly projectService: ProjectService,
    private readonly organizationService: OrganizationService,
  ) {}

  @Query(() => [Project], { name: 'projects' })
  projects(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @ResolveField(() => Organization, { nullable: true })
  organization(@Parent() project: Project): Promise<Organization | null> {
    return this.organizationService.findById(project.organizationId);
  }
}
