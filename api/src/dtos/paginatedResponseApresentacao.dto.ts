import { Apresentacao } from '@domains/Apresentacao';

export class PaginatedResponseApresentacaoDTO {
  id: string;
  nome: string;
  clientId: string;
  sobre?: string | null;
  userPhoto?: string | null;

  constructor(apresentacao: Apresentacao) {
    this.id = apresentacao.id;
    this.clientId = apresentacao.clientId;
    this.nome = apresentacao.nome;
    this.sobre = apresentacao.sobre;
    this.userPhoto = apresentacao.userPhotoPath;
  }
}
