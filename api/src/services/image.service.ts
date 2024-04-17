import { Apresentacao } from '@domains/Apresentacao';
import { Injectable, Logger } from '@nestjs/common';
import { ApresentacaoRepository } from '@repositories/apresentacao.repository';

@Injectable()
export class ImageService {
  constructor(private apresentacaoRepository: ApresentacaoRepository) { }

  async saveImage(path: string, clientId: string) {
    const apresentacao = await this.apresentacaoRepository.findByClientId(clientId);
    apresentacao.userPhotoPath = path;
    const updatedApresentacao = await this.apresentacaoRepository.update(apresentacao);
    return updatedApresentacao;
  }
}
