import { Apresentacao } from '../domain/Apresentacao';

export abstract class ApresentacaoRepository {
  abstract save(apresentacao: Apresentacao): Promise<void>;
}
