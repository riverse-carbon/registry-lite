import type { Organization, Project } from '@generated/prisma-client';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { OrganizationService } from '../organization/organization.service';
import type { CreateProjectInput } from './create-project.input';
import { ProjectService } from './project.service';

@Resolver('Project')
export class ProjectResolver {
  constructor(
    private readonly projectService: ProjectService,
    private readonly organizationService: OrganizationService,
  ) {}

  @Query('projects')
  projects(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Query('project')
  project(@Args('id') id: string): Promise<Project | null> {
    return this.projectService.findById(id);
  }

  @Mutation('createProject')
  createProject(@Args('input') input: CreateProjectInput): Promise<Project> {
    return this.projectService.create(input);
  }

  @ResolveField('organization')
  organization(@Parent() project: Project): Promise<Organization | null> {
    return this.organizationService.findById(project.organizationId);
  }
}
