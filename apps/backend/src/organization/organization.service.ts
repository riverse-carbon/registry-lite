import type { Organization, Project } from '@generated/prisma-client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<Organization | null> {
    return this.prisma.organization.findUnique({ where: { id } });
  }

  async findProjectsByOrganizationId(organizationId: string): Promise<Array<Project>> {
    const projects = await this.prisma.organization
      .findUnique({ where: { id: organizationId } })
      .projects();
    return projects ?? [];
  }
}
