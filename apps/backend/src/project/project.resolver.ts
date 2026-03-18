import { Query, Resolver } from '@nestjs/graphql';
import { Project } from './project.model';
import type { ProjectService } from './project.service';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [Project], { name: 'projects' })
  projects(): Promise<Project[]> {
    return this.projectService.findAll();
  }
}
