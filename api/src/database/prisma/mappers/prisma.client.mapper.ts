import { Client } from '@domains/Client';

export class PrismaClientMapper {
  static toPrisma(client: Client) {
    return {
      id: client.id,
      status: client.status,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }

  static fromPrisma(client: any): Client {
    return new Client({
      id: client.id,
      status: client.status,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
  }
}
