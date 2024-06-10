import { Apresentacao } from 'src/domain/Apresentacao';
export class ApresentacaoViewModel {
  static toHTTP(apresentacao: Apresentacao) {
    return {
      id: apresentacao.id,
      nome: apresentacao.nome,
      contato: apresentacao.contato,
      email: apresentacao.email,
      sobre: apresentacao.sobre,
      userPhotoPath: apresentacao.userPhotoPath,
      clientId: apresentacao.clientId,
    };
  }
}
