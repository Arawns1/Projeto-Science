import { Module } from '@nestjs/common';
import { ApresentacaoController } from './apresentacao.controller';
import { ApresentacaoService } from '../services/apresentacao.service';
import { DatabaseModule } from '../database/database.module';
import { ClientService } from '@services/client.service';
import { ClientController } from './client.controller';
import { ImageController } from './image.controller';
import { ImageService } from '@services/image.service';
import { DiagnosticoController } from './diagnostico.controller';
import { DiagnosticoService } from '@services/diagnostico.service';
import { ConcorrenteService } from '@services/concorrente.service';

@Module({
  imports: [DatabaseModule],
  controllers: [
    ApresentacaoController,
    ClientController,
    ImageController,
    DiagnosticoController,
  ],
  providers: [
    ApresentacaoService,
    ClientService,
    ImageService,
    DiagnosticoService,
    ConcorrenteService,
  ],
})
export class ControllersModule {}