import { Injectable, Logger } from '@nestjs/common';
import { ApresentacaoRepository } from '@repositories/apresentacao.repository';
import { PersonaRepository } from '@repositories/persona.repository';

@Injectable()
export class ImageService {
  constructor(
    private apresentacaoRepository: ApresentacaoRepository,
    private personaRepository: PersonaRepository,
  ) {}

  async saveImage(path: string, clientId: string) {
    const apresentacao =
      await this.apresentacaoRepository.findByClientId(clientId);
    apresentacao.userPhotoPath = path;
    const updatedApresentacao =
      await this.apresentacaoRepository.update(apresentacao);
    return updatedApresentacao;
  }
  async savePersonaImage(path: string, personaId: string) {
    const persona = await this.personaRepository.findById(personaId);
    persona.personaPhotoPath = path;
    const updatedApresentacao = await this.personaRepository.update(persona);
    return updatedApresentacao;
  }
}
