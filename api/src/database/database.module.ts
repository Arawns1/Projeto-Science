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
  ],
  exports: [
    ApresentacaoRepository,
    ClientRepository,
    DiagnosticoRepository,
    ConcorrenteRepository,
  ],
})
export class DatabaseModule {}
