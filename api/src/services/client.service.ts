import { ProjetoRepository } from '@repositories/projeto.repository';
import { ApresentacaoRepository } from '@repositories/apresentacao.repository';
import { Injectable } from '@nestjs/common';
import { Client } from '@domains/Client';
import { ClientRepository } from '@repositories/client.repository';
import * as fs from 'fs';
import { cwd } from 'process';
import { PersonaRepository } from '@repositories/persona.repository';

interface ClientResponse {
  clients: Client[];
}

@Injectable()
export class ClientService {
  constructor(
    private clientRepository: ClientRepository,
    private apresentacaoRepository: ApresentacaoRepository,
    private projetoRepository: ProjetoRepository,
    private personasRepository: PersonaRepository,
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

    const projeto = await this.projetoRepository.findByClientId(
      apresentacao.clientId,
    );

    const personas = await this.personasRepository.findAllByProjetoId(
      projeto.id,
    );

    personas.forEach(async (persona) => {
      if (persona.personaPhotoPath)
        fs.unlinkSync(cwd() + persona.personaPhotoPath);
    });

    await this.clientRepository.delete(apresentacao.clientId);
  }
}
