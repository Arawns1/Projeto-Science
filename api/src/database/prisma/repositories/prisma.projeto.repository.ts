import { Projeto } from '@domains/Projeto';
import { Injectable } from '@nestjs/common';
import { ProjetoRepository } from '@repositories/projeto.repository';
import { PrismaFieldMapper } from '../mappers/prisma.field.mapper';
import { PrismaFunilMapper } from '../mappers/prisma.funil.mapper';
import { PrismaProjetoMapper } from '../mappers/prisma.projeto.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaProjetoRepository implements ProjetoRepository {
  constructor(private prismaService: PrismaService) {}

  async save(projeto: Projeto): Promise<Projeto> {
    const raw = PrismaProjetoMapper.toPrisma(projeto);
    const funis_raw = projeto.funis.map((funil) =>
      PrismaFunilMapper.toPrisma(funil),
    );
    const fields_raw = projeto.genericFields.map((field) =>
      PrismaFieldMapper.toPrisma(field),
    );

    try {
      await this.prismaService.$transaction(async (trx) => {
        await trx.projeto.create({
          data: raw,
        });
        await trx.proposito.createMany({
          data: projeto.propositos.map((proposito) => ({
            title: proposito.title,
            value: proposito.value,
            projetoId: raw.id,
          })),
        });

        await trx.persona.createMany({
          data: projeto.personas.map((persona) => ({
            personaPhotoPath: persona.personaPhotoPath,
            nome: persona.nome,
            idade: persona.idade,
            profissao: persona.profissao,
            sobre: persona.sobre,
            projetoId: raw.id,
          })),
        });

        await trx.setupDeConteudo.createMany({
          data: projeto.conteudos.map((conteudo) => ({
            title: conteudo.title,
            value: conteudo.value,
            projetoId: raw.id,
          })),
        });

        await trx.objetivoRede.createMany({
          data: projeto.redesSociais.map((redeSocial) => ({
            nome: redeSocial.nome,
            objetivo: redeSocial.objetivo,
            frequencia: redeSocial.frequencia,
            estruturaLinguagem: redeSocial.estruturaLinguagem,
            projetoId: raw.id,
          })),
        });

        await trx.field.createMany({
          data: fields_raw.map((field) => ({ ...field, projetoId: raw.id })),
        });

        await trx.fieldContent.createMany({
          data: projeto.genericFields.flatMap((field) => {
            if (!field.fieldContent) {
              return [];
            }
            return field.fieldContent.map((fieldContent) => ({
              title: fieldContent.title,
              value: fieldContent.value,
              fieldId: field.id,
            }));
          }),
        });

        await trx.funil.createMany({
          data: funis_raw.map((funil) => ({ ...funil, projetoId: raw.id })),
        });

        await trx.funilFormato.createMany({
          data: projeto.funis.flatMap((funil) => {
            if (!funil.formatos) {
              return [];
            }
            return funil.formatos.map((formato) => ({
              formato: formato.formato,
              titulo: formato.titulo,
              funilId: funil.id,
            }));
          }),
        });
      });
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
      throw error;
    }
    const projetoSalvo = await this.prismaService.projeto.findUnique({
      where: {
        clientId: projeto.clientId,
      },
    });

    if (!projetoSalvo) {
      throw new Error('Projeto não encontrado após a transação.');
    }

    return projetoSalvo as Projeto;
  }
  async list(): Promise<Projeto[]> {
    const projeto = await this.prismaService.projeto.findMany({
      include: {
        propositos: true,
        personas: true,
        conteudos: true,
        redesSociais: true,
        funis: {
          include: {
            formatos: true,
          },
        },
        genericFields: {
          include: {
            FieldContent: true,
          },
        },
      },
    });
    return projeto as unknown as Projeto[];
  }

  async findByClientId(clientId: string): Promise<Projeto> {
    const projeto = await this.prismaService.projeto.findFirst({
      include: {
        propositos: true,
        personas: true,
        conteudos: true,
        redesSociais: true,
        funis: {
          include: {
            formatos: true,
          },
        },
        genericFields: {
          include: {
            FieldContent: true,
          },
        },
      },
      where: {
        clientId: clientId,
      },
    });

    if (!projeto) {
      throw new Error('Projeto not found');
    }

    return projeto as unknown as Projeto;
  }
  async findById(id: string): Promise<Projeto> {
    const projeto = await this.prismaService.projeto.findFirst({
      include: {
        propositos: true,
        personas: true,
        conteudos: true,
        redesSociais: true,
        funis: {
          include: {
            formatos: true,
          },
        },
        genericFields: {
          include: {
            FieldContent: true,
          },
        },
      },
      where: {
        id: id,
      },
    });

    if (!projeto) {
      throw new Error('Projeto not found');
    }

    return projeto as unknown as Projeto;
  }
}
