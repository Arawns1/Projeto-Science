import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './database/prisma/prisma.service';

@Controller('clients')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list() {
    return this.prisma.client.findMany({
      include: {
        Apresentacao: true,
      },
    });
  }

  // @Post()
  // async create() {
  //   await this.prisma.client.create({
  //     data: {
  //       nome: 'Gabriel Damico',
  //     },
  //   });
  // }

  // @Post('projeto')
  // async createProjeto() {
  //   const proposito = await this.prisma.proposito.create({
  //     data: {
  //       title: 'Proposito 1',
  //       value: 'Proposito 1',
  //     },
  //   });

  //   const persona = await this.prisma.persona.create({
  //     data: {
  //       nome: 'Persona 1',
  //       idade: 20,
  //       profissao: 'Desenvolvedor',
  //       sobre: 'Sobre a persona',
  //     },
  //   });

  //   const conteudo = await this.prisma.setupDeConteudo.create({
  //     data: {
  //       title: 'Conteudo 1',
  //       value: 'Conteudo 1',
  //     },
  //   });

  //   const redeSocial = await this.prisma.objetivoRede.create({
  //     data: {
  //       nome: '',
  //       estruturaLinguagem: '',
  //       frequencia: '',
  //       objetivo: '',
  //     },
  //   });

  //   const funilFormato = await this.prisma.funilFormato.create({
  //     data: {
  //       formato: 'formato',
  //       titulo: '',
  //     },
  //   });

  //   const funil = await this.prisma.funil.create({
  //     data: {
  //       nome_title: 'TITLE',
  //       nome_value: 'value',
  //       formatos: { connect: { id: funilFormato.id } },
  //       tipos: [''],
  //       faseTambem: [''],
  //     },
  //   });

  //   await this.prisma.projeto.create({
  //     data: {
  //       dna_estilo: '',
  //       dna_comunicacao: '',
  //       dna_valores: '',
  //       dna_personalidade: '',
  //       propositos: { connect: { id: proposito.id } },
  //       personas: { connect: { id: persona.id } },
  //       conteudos: { connect: { id: conteudo.id } },
  //       redesSociais: { connect: { id: redeSocial.id } },
  //       funis: { connect: { id: funil.id } },
  //       palavrasChave: [''],
  //       linkPlanilhaPalavras: '',
  //       clientId: '661b0ac329c284a45840b25e',
  //     },
  //   });
  // @Post('diagnostico')
  // async createDiagnostico() {
  //   await this.prisma.diagnostico.create({
  //     data: {},
  //   });
  // }

  // @Post('cronograma')
  // async createCronograma() {
  //   await this.prisma.cronograma.create({
  //     data: {},
  //   });
  // }

  // @Post('identidadeVisual')
  // async createIdentidadeVisual() {
  //   await this.prisma.cronograma.create({
  //     data: {},
  //   });
  // }
}
