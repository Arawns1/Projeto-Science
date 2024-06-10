import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Cronograma } from '@domains/Cronograma';
import { CronogramaRepository } from '@repositories/cronograma.repository';
import { PrismaCronogramaMapper } from '../mappers/prisma.cronograma.mapper';

@Injectable()
export class PrismaCronogramaRepository implements CronogramaRepository {
  constructor(private prismaService: PrismaService) {}

  async save(cronograma: Cronograma): Promise<void> {
    const raw = PrismaCronogramaMapper.toPrisma(cronograma);

    try {
      await this.prismaService.$transaction([
        this.prismaService.cronograma.create({ data: raw }),
        this.prismaService.evento.createMany({
          data: cronograma.eventos.map((evento) => ({
            status: evento.status,
            from: evento.from,
            to: evento.to,
            title: evento.title,
            value: evento.value,
            cronogramaId: raw.id,
          })),
        }),
      ]);
    } catch (error) {
      console.error('Erro ao salvar cronograma:', error);
      throw error;
    }
  }
  async list(): Promise<Cronograma[]> {
    const cronogramaList = await this.prismaService.cronograma.findMany({
      include: {
        eventos: true,
      },
    });
    return cronogramaList as unknown as Cronograma[];
  }
}
