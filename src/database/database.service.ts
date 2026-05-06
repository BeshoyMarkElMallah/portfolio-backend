import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'src/generated/prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }

  prisma: PrismaClient;

  constructor() {
    super({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL as string,
    })
    });
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL as string,
    });

    this.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
      adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL as string,
      })
    });
  }
}
