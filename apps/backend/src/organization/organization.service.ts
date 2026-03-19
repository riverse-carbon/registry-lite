import { Injectable } from '@nestjs/common';
// biome-ignore lint/style/useImportType: NestJS DI requires a value import
import { PrismaService } from '../prisma/prisma.service';
import type { Organization } from './organization.model';

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
