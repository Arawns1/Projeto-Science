import { Injectable } from '@nestjs/common';
import { ApresentacaoRepository } from '../repositories/apresentacao.repository';
import { Apresentacao } from '../domain/Apresentacao';
import { saveApresentacaoDTO } from '@dtos/saveApresentacao.dto';
import { Client } from '@domains/Client';
import { ClientRepository } from '@repositories/client.repository';

//TODO: Implementar a lógica de salvar caminho da imagem

interface ApresentacaoResponse {
  apresentacao: Apresentacao;
}

@Injectable()
export class ApresentacaoService {
  constructor(
    private apresentacaoRepository: ApresentacaoRepository,
    private clientRepository: ClientRepository,
  ) {}

  async save(
    apresentacaoDTO: saveApresentacaoDTO,
  ): Promise<ApresentacaoResponse> {
    const client = new Client({});

    await this.clientRepository.save(client);

    const apresentacao = new Apresentacao({
      nome: apresentacaoDTO.nome,
      contato: apresentacaoDTO.contato,
      email: apresentacaoDTO.email,
      userPhotoPath: '/path/to/photo',
      senha: apresentacaoDTO.senha,
      sobre: apresentacaoDTO.sobre,
      clientId: client.id,
    });

    //Persistir no banco de dados
    await this.apresentacaoRepository.save(apresentacao);

    return {
      apresentacao,
    };
  }
}
