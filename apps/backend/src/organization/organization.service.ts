import type { Organization } from '@generated/prisma-client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<Organization | null> {
    return this.prisma.organization.findUnique({ where: { id } });
  }

  findProjectsByOrganizationId(
    organizationId: string,
  ): Promise<{ id: string; name: string; organizationId: string }[]> {
    return this.prisma.project.findMany({ where: { organizationId } });
  }
}
