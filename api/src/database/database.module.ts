import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ApresentacaoRepository } from '../repositories/apresentacao.repository';
import { PrismaApresentacaoRepository } from './prisma/repositories/prisma.Apresentacao.repository';
import { ClientRepository } from '@repositories/client.repository';
import { PrismaClientRepository } from './prisma/repositories/prisma.client.repository';

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
  ],
  exports: [ApresentacaoRepository, ClientRepository],
})
export class DatabaseModule {}
