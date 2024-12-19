import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class ServicesService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createServiceDto: Prisma.ServiceCreateInput) {
    return this.databaseService.service.create({
      data: createServiceDto
    })
  }

  async findAll() {
    return this.databaseService.service.findMany({});
  }

  async findOne(id: number) {
    const service = await this.databaseService.service.findUnique({ where: { id } });
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    return service;
  }


  async update(id: number, updateServiceDto: Prisma.ServiceUpdateInput) {
    const service = await this.findOne(id);


    const serviceUpdate = await this.databaseService.service.update({
      where: {
        id
      },
      data: updateServiceDto
    });
    return serviceUpdate;
  }

  async remove(id: number) {
    return this.databaseService.service.delete({ where: { id } });
  }
}
