import type { Project } from '@generated/prisma-client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateProjectInput } from './create-project.input';

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
