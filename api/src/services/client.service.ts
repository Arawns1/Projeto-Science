import { ProjetoRepository } from '@repositories/projeto.repository';
import { ApresentacaoRepository } from '@repositories/apresentacao.repository';
import { Injectable, Logger } from '@nestjs/common';
import { Client } from '@domains/Client';
import { ClientRepository } from '@repositories/client.repository';
import * as fs from 'fs';
import { cwd } from 'process';
import { PersonaRepository } from '@repositories/persona.repository';
import { IdentidadeVisualRepository } from '@repositories/identidadeVisual.repository';

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
    private identidadeVisualRepository: IdentidadeVisualRepository,
  ) {}

  async list(): Promise<ClientResponse> {
    const clients = await this.clientRepository.list();

    return {
      clients,
    };
  }

  async deleteByApresentacaoId(apresentacaoId: string): Promise<void> {
    Logger.log('[Deletando Projeto]  - Encontrando apresentação pelo id');
    const apresentacao =
      await this.apresentacaoRepository.findById(apresentacaoId);

    Logger.log('[Deletando Projeto]  - Apagando userPhoto');

    if (apresentacao.userPhotoPath) {
      fs.unlinkSync(cwd() + apresentacao.userPhotoPath);
    }

    let projeto: any = {};
    try {
      projeto = await this.projetoRepository.findByClientId(
        apresentacao.clientId,
      );
    } catch (error) {
      Logger.error('[Deletando Projeto] - Projeto não encontrado');
    }

    let personas: any = [];

    try {
      personas = await this.personasRepository.findAllByProjetoId(projeto.id);
      Logger.log('[Deletando Projeto]  - Apagando personas');
      personas.forEach(async (persona) => {
        if (persona.personaPhotoPath)
          fs.unlinkSync(cwd() + persona.personaPhotoPath);
      });
    } catch (error) {
      Logger.error('[Deletando Projeto] - Personas não encontradas');
    }

    Logger.log(
      '[Deletando Projeto]  - Encontrando identidades pelo id do cliente',
    );

    try {
      Logger.log('[Deletando Projeto]  - Apagando identidades');
      const identidades =
        await this.identidadeVisualRepository.findAllByClientId(
          apresentacao.clientId,
        );
      identidades.forEach(async (identidade) => {
        if (identidade.identidadeVisualPhotoPath)
          fs.unlinkSync(cwd() + identidade.identidadeVisualPhotoPath);
      });
    } catch (error) {
      Logger.error('[Deletando Projeto] - Identidades não encontradas');
    }

    await this.clientRepository.delete(apresentacao.clientId);
  }
}
