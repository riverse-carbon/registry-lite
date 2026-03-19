import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Organization } from '../organization/organization.model';
import { OrganizationService } from '../organization/organization.service';
import { CreateProjectInput } from './create-project.input';
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

  @Mutation(() => Project, { name: 'createProject' })
  createProject(@Args('input') input: CreateProjectInput): Promise<Project> {
    return this.projectService.create(input);
  }

  @ResolveField(() => Organization, { nullable: true })
  organization(@Parent() project: Project): Promise<Organization | null> {
    return this.organizationService.findById(project.organizationId);
  }
}
