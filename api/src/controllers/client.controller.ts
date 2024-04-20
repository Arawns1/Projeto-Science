import { Controller, Delete, Get, Logger, Param, Query } from '@nestjs/common';
import { ClientService } from '@services/client.service';

@Controller('clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get()
  async list() {
    const { clients } = await this.clientService.list();
    return clients;
  }

  @Delete(':apresentacaoId')
  async deleteByApresentacaoId(@Param('apresentacaoId') id: string) {
    await this.clientService.deleteByApresentacaoId(id);
  }
}
