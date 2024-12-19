import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class ProjectsService {
  constructor(private readonly databaseService: DatabaseService) { }
  create(createProjectDto: Prisma.ProjectsCreateInput) {
    return this.databaseService.projects.create({ data: createProjectDto });
  }

  async findAll() {
    return await this.databaseService.projects.findMany({
      include: { category: true }
    });
  }

  async findOne(id: number) {
    const project = await this.databaseService.projects.findUnique({
      where: { id },
      include: { category: true }
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async update(id: number, updateProjectDto: Prisma.ProjectsUpdateInput) {
    const project = await this.findOne(id);
    const projectUpdate = await this.databaseService.projects.update({
      where: {
        id
      },
      data: updateProjectDto,
      include: { category: true }
    });
    return projectUpdate;
  }

  remove(id: number) {
    return this.databaseService.projects.delete({
      where: { id }
      , include: { category: true }
    });
  }
}
