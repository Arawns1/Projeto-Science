import { Injectable } from '@nestjs/common';
import { Apresentacao } from '@domains/Apresentacao';
import { ApresentacaoRepository } from '@repositories/apresentacao.repository';
import { PrismaService } from '../prisma.service';
import { PrismaApresentacaoMapper } from '../mappers/prisma.apresentacao.mapper';

@Injectable()
export class PrismaApresentacaoRepository implements ApresentacaoRepository {
  constructor(private prismaService: PrismaService) {}

  async save(apresentacao: Apresentacao): Promise<void> {
    const raw = PrismaApresentacaoMapper.toPrisma(apresentacao);
    await this.prismaService.apresentacao.create({
      data: raw,
    });
  }

  async list(): Promise<Apresentacao[]> {
    const apresentacaoList = await this.prismaService.apresentacao.findMany({
      orderBy: { createdAt: 'asc' },
    });
    const mappedApresentacao: Apresentacao[] = apresentacaoList.map(
      PrismaApresentacaoMapper.fromPrisma,
    );
    return mappedApresentacao;
  }
  async paginatedList(page: number, perPage: number): Promise<Apresentacao[]> {
    const apresentacaoList = await this.prismaService.apresentacao.findMany({
      skip: page > 0 ? page * perPage : 0,
      take: page > 0 ? perPage * page : perPage,
      orderBy: { createdAt: 'asc' },
    });
    const mappedApresentacao: Apresentacao[] = apresentacaoList.map(
      PrismaApresentacaoMapper.fromPrisma,
    );
    return mappedApresentacao;
  }
}
