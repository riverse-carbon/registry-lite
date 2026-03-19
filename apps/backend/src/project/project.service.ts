import { Injectable } from '@nestjs/common';
// biome-ignore lint/style/useImportType: NestJS DI requires a value import
import { PrismaService } from '../prisma/prisma.service';
import type { CreateProjectInput } from './create-project.input';
import type { Project } from './project.model';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Project[]> {
    return this.prisma.project.findMany();
  }

  create(input: CreateProjectInput): Promise<Project> {
    return this.prisma.project.create({ data: input });
  }
}
