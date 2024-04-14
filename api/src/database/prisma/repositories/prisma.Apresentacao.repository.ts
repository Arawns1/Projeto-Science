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
}
