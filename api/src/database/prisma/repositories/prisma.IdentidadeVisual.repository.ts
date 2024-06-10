import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IdentidadeVisualRepository } from '@repositories/identidadeVisual.repository';
import { IdentidadeVisual } from '@domains/IdentidadeVisual';
import { PrismaIdentidadeVisualMapper } from '../mappers/prisma.identidadeVisual.mapper';

@Injectable()
export class PrismaIdentidadeVisualRepository
  implements IdentidadeVisualRepository
{
  constructor(private prismaService: PrismaService) {}

  async save(identidadeVisual: IdentidadeVisual): Promise<void> {
    const raw = PrismaIdentidadeVisualMapper.toPrisma(identidadeVisual);
    await this.prismaService.identidadeVisual.create({
      data: raw,
    });
  }

  async list(): Promise<IdentidadeVisual[]> {
    const identidadeVisual =
      await this.prismaService.identidadeVisual.findMany();
    return identidadeVisual as unknown as IdentidadeVisual[];
  }

  async findAllByClientId(clientId: string): Promise<IdentidadeVisual[]> {
    const identidadeVisual = await this.prismaService.identidadeVisual.findMany(
      {
        where: {
          clientId: clientId,
        },
      },
    );
    return identidadeVisual as unknown as IdentidadeVisual[];
  }
  async findById(id: string): Promise<IdentidadeVisual> {
    const identidadeVisual =
      await this.prismaService.identidadeVisual.findUnique({
        where: { id },
      });
    return identidadeVisual as unknown as IdentidadeVisual;
  }
}
