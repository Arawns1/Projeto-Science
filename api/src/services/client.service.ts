import { Injectable } from '@nestjs/common';

import { Client } from '@domains/Client';
import { ClientRepository } from '@repositories/client.repository';

//TODO: Implementar a lógica de salvar caminho da imagem

interface ClientResponse {
  clients: Client[];
}

@Injectable()
export class ClientService {
  constructor(private clientRepository: ClientRepository) {}

  async list(): Promise<ClientResponse> {
    const clients = await this.clientRepository.list();

    return {
      clients,
    };
  }
}
