import { Controller, Get, Query } from '@nestjs/common';
import { ClientService } from '@services/client.service';

@Controller('clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get()
  async list() {
    const { clients } = await this.clientService.list();
    return clients;
  }
}
