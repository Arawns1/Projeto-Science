import { Apresentacao } from '@domains/Apresentacao';

export class ClientViewModel {
  static toHTTP(client: Apresentacao) {
    return {
      id: client.id,
      nome: client.nome,
      userPhoto: client.userPhotoPath,
      sobre: client.sobre,
    };
  }
}
