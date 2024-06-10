import { Apresentacao } from '@domains/Apresentacao';
import { ApresentacaoRepository } from '@repositories/apresentacao.repository';

export class InMemoryApresentacaoRepository implements ApresentacaoRepository {
  public apresentacoes: Apresentacao[] = [];

  async save(apresentacao: Apresentacao) {
    this.apresentacoes.push(apresentacao);
  }
}
