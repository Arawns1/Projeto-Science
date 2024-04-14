import { Module } from '@nestjs/common';
import { ApresentacaoController } from './apresentacao.controller';
import { ApresentacaoService } from '../services/apresentacao.service';
import { DatabaseModule } from '../database/database.module';
import { ClientService } from '@services/client.service';
import { ClientController } from './client.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ApresentacaoController, ClientController],
  providers: [ApresentacaoService, ClientService],
})
export class ControllersModule {}
