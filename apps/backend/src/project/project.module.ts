import { Module } from '@nestjs/common';
import { OrganizationModule } from '../organization/organization.module';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';

@Module({
  imports: [OrganizationModule],
  providers: [ProjectResolver, ProjectService],
})
export class ProjectModule {}
