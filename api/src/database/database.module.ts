import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ApresentacaoRepository } from '../repositories/apresentacao.repository';
import { PrismaApresentacaoRepository } from './prisma/repositories/prisma.Apresentacao.repository';
import { ClientRepository } from '@repositories/client.repository';
import { PrismaClientRepository } from './prisma/repositories/prisma.client.repository';
import { ConcorrenteRepository } from '@repositories/concorrente.repository';
import { PrismaConcorrenteRepository } from './prisma/repositories/prisma.Concorrente.repository';
import { DiagnosticoRepository } from '@repositories/diagnostico.repository';
import { PrismaDiagnosticoRepository } from './prisma/repositories/prisma.Diagnostico.repository';
import { ProjetoRepository } from '@repositories/projeto.repository';
import { PrismaProjetoRepository } from './prisma/repositories/prisma.projeto.repository';
import { PersonaRepository } from '@repositories/persona.repository';
import { PrismaPersonaRepository } from './prisma/repositories/prisma.Persona.repository';
import { CronogramaRepository } from '@repositories/cronograma.repository';
import { PrismaCronogramaRepository } from './prisma/repositories/prisma.Cronograma.repository';
import { IdentidadeVisualRepository } from '@repositories/identidadeVisual.repository';
import { PrismaIdentidadeVisualRepository } from './prisma/repositories/prisma.IdentidadeVisual.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: ApresentacaoRepository,
      useClass: PrismaApresentacaoRepository,
    },
    {
      provide: ClientRepository,
      useClass: PrismaClientRepository,
    },
    {
      provide: DiagnosticoRepository,
      useClass: PrismaDiagnosticoRepository,
    },
    {
      provide: ConcorrenteRepository,
      useClass: PrismaConcorrenteRepository,
    },
    {
      provide: ProjetoRepository,
      useClass: PrismaProjetoRepository,
    },
    {
      provide: PersonaRepository,
      useClass: PrismaPersonaRepository,
    },
    {
      provide: CronogramaRepository,
      useClass: PrismaCronogramaRepository,
    },
    {
      provide: IdentidadeVisualRepository,
      useClass: PrismaIdentidadeVisualRepository,
    },
  ],
  exports: [
    ApresentacaoRepository,
    ClientRepository,
    DiagnosticoRepository,
    ConcorrenteRepository,
    ProjetoRepository,
    PersonaRepository,
    CronogramaRepository,
    IdentidadeVisualRepository,
  ],
})
export class DatabaseModule {}
