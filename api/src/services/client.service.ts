import { ApresentacaoRepository } from '@repositories/apresentacao.repository';
import { Injectable } from '@nestjs/common';
import { Client } from '@domains/Client';
import { ClientRepository } from '@repositories/client.repository';
import * as fs from 'fs';
import { cwd } from 'process';

interface ClientResponse {
  clients: Client[];
}

@Injectable()
export class ClientService {
  constructor(
    private clientRepository: ClientRepository,
    private apresentacaoRepository: ApresentacaoRepository,
  ) {}

  async list(): Promise<ClientResponse> {
    const clients = await this.clientRepository.list();

    return {
      clients,
    };
  }

  async deleteByApresentacaoId(apresentacaoId: string): Promise<void> {
    const apresentacao =
      await this.apresentacaoRepository.findById(apresentacaoId);
    if (apresentacao.userPhotoPath) {
      fs.unlinkSync(cwd() + apresentacao.userPhotoPath);
    }
    await this.clientRepository.delete(apresentacao.clientId);
  }
}
