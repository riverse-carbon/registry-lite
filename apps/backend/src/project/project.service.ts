import type { Project } from '@generated/prisma-client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateProjectInput } from './create-project.input';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Array<Project>> {
    return this.prisma.project.findMany();
  }

  findById(id: string): Promise<Project | null> {
    return this.prisma.project.findUnique({ where: { id } });
  }

  create(input: CreateProjectInput): Promise<Project> {
    return this.prisma.project.create({ data: input });
  }
}
