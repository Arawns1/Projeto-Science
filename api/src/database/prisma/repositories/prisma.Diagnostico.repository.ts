import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DiagnosticoRepository } from '@repositories/diagnostico.repository';
import { Diagnostico } from '@domains/Diagnostico';
import { PrismaDiagnosticoMapper } from '../mappers/prisma.diagnostico.mapper';

@Injectable()
export class PrismaDiagnosticoRepository implements DiagnosticoRepository {
  constructor(private prismaService: PrismaService) {}

  async findDiagnosticoByClientId(clientId: string): Promise<Diagnostico> {
    const diagnostico = await this.prismaService.diagnostico.findFirst({
      where: { clientId },
      include: { concorrentes: true },
    });
    return diagnostico as Diagnostico;
  }

  async save(diagnostico: Diagnostico): Promise<Diagnostico> {
    const raw = PrismaDiagnosticoMapper.toPrisma(diagnostico);
    const savedDiagnostico = await this.prismaService.diagnostico.create({
      data: raw,
      include: { concorrentes: true },
    });
    return savedDiagnostico as Diagnostico;
  }
  async list(): Promise<Diagnostico[]> {
    const diagnostico = await this.prismaService.diagnostico.findMany({
      include: { concorrentes: true },
    });
    return diagnostico as Diagnostico[];
  }

  async delete(diagnosticoId: string): Promise<void> {
    await this.prismaService.diagnostico.delete({
      where: { id: diagnosticoId },
    });
  }
}
