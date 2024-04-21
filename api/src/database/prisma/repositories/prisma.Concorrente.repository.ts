import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ConcorrenteRepository } from '@repositories/concorrente.repository';
import { Concorrente } from '@domains/Concorrente';
import { PrismaConcorrenteMapper } from '../mappers/prisma.concorrente.mapper';

@Injectable()
export class PrismaConcorrenteRepository implements ConcorrenteRepository {
  constructor(private prismaService: PrismaService) {}
  async save(concorrente: Concorrente): Promise<void> {
    const raw = PrismaConcorrenteMapper.toPrisma(concorrente);
    await this.prismaService.concorrente.create({
      data: raw,
    });
  }
  async saveAll(concorrentes: Concorrente[]): Promise<void> {
    const raw = concorrentes.map(PrismaConcorrenteMapper.toPrisma);
    await this.prismaService.concorrente.createMany({
      data: raw,
    });
  }
  async list(): Promise<Concorrente[]> {
    const concorrentes = await this.prismaService.concorrente.findMany();
    return concorrentes as Concorrente[];
  }

  async findByDiagnosticoId(diagnosticoId: string): Promise<Concorrente[]> {
    const concorrentes = await this.prismaService.concorrente.findMany({
      where: {
        diagnosticoId,
      },
    });
    return concorrentes as Concorrente[];
  }
  async delete(concorrenteId: string): Promise<void> {
    await this.prismaService.concorrente.delete({
      where: {
        id: concorrenteId,
      },
    });
  }
}
