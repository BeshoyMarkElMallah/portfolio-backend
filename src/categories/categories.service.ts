import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class CategoriesService {
  constructor(private readonly databaseService: DatabaseService) { }
  create(createCategoryDto: Prisma.CategoryCreateInput) {
    return this.databaseService.category.create({ data: createCategoryDto });
  }

  async findAll() {
    return await this.databaseService.category.findMany({ include: { Projects: { include: { category: true } } } });
  }

  async findOne(id: number) {
    const category = await this.databaseService.category.findUnique({ where: { id }, include: { Projects: { include: { category: true } } } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(id: number, updateCategoryDto: Prisma.CategoryUpdateInput) {
    const category = await this.findOne(id);
    const categoryUpdate = await this.databaseService.category.update({
      where: {
        id
      },
      data: updateCategoryDto
    });
    return categoryUpdate;
  }

  remove(id: number) {
    return this.databaseService.category.delete({ where: { id } });
  }
}
