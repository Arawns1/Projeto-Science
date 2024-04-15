import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ClientRepository } from '@repositories/client.repository';
import { Client } from '@domains/Client';
import { PrismaClientMapper } from '../mappers/prisma.client.mapper';

@Injectable()
export class PrismaClientRepository implements ClientRepository {
  constructor(private prismaService: PrismaService) {}
  count(): Promise<number> {
    return this.prismaService.client.count();
  }

  async save(client: Client): Promise<void> {
    const raw = PrismaClientMapper.toPrisma(client);
    await this.prismaService.client.create({
      data: raw,
    });
  }
  async list(): Promise<Client[]> {
    const clientList = await this.prismaService.client.findMany({
      orderBy: { createdAt: 'asc' },
    });

    const mappedClients: Client[] = clientList.map(
      PrismaClientMapper.fromPrisma,
    );
    return mappedClients;
  }
}
