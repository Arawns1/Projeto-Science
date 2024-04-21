import { Apresentacao } from '@domains/Apresentacao';
import { Injectable } from '@nestjs/common';
import { ApresentacaoRepository } from '@repositories/apresentacao.repository';
import { PrismaApresentacaoMapper } from '../mappers/prisma.apresentacao.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaApresentacaoRepository implements ApresentacaoRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(id: string): Promise<Apresentacao> {
    const apresentacao = await this.prismaService.apresentacao.findFirst({
      where: {
        id: id,
      },
    });

    if (!apresentacao) {
      throw new Error('Apresentacao not found');
    }

    return apresentacao as Apresentacao;
  }

  async findByClientId(clientId: string): Promise<Apresentacao> {
    const apresentacao = await this.prismaService.apresentacao.findFirst({
      where: {
        clientId: clientId,
      },
    });

    if (!apresentacao) {
      throw new Error('Apresentacao not found');
    }

    return apresentacao as Apresentacao;
  }

  async save(apresentacao: Apresentacao): Promise<void> {
    const raw = PrismaApresentacaoMapper.toPrisma(apresentacao);
    await this.prismaService.apresentacao.create({
      data: raw,
    });
  }

  async update(apresentacao: Apresentacao): Promise<Apresentacao> {
    const updatedApresentacao = await this.prismaService.apresentacao.update({
      where: {
        clientId: apresentacao.clientId,
      },
      data: {
        nome: apresentacao.nome,
        contato: apresentacao.contato,
        email: apresentacao.email,
        sobre: apresentacao.sobre,
        userPhotoPath: apresentacao.userPhotoPath,
      },
    });
    return updatedApresentacao as Apresentacao;
  }

  async list(): Promise<Apresentacao[]> {
    const apresentacaoList = await this.prismaService.apresentacao.findMany({
      orderBy: { createdAt: 'asc' },
    });

    return apresentacaoList as Apresentacao[];
  }
  async paginatedList(page: number, perPage: number): Promise<Apresentacao[]> {
    const apresentacaoList = await this.prismaService.apresentacao.findMany({
      skip: page > 0 ? page * perPage : 0,
      take: page > 0 ? perPage * page : perPage,
      orderBy: { createdAt: 'asc' },
    });

    return apresentacaoList as Apresentacao[];
  }
  async searchByName(name: string): Promise<Apresentacao[]> {
    const apresentacaoList = await this.prismaService.apresentacao.findMany({
      where: {
        nome: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });

    return apresentacaoList as Apresentacao[];
  }
}
