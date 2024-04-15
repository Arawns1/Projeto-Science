import { Apresentacao } from '../domain/Apresentacao';

export abstract class ApresentacaoRepository {
  abstract save(apresentacao: Apresentacao): Promise<void>;
  abstract list(): Promise<Apresentacao[]>;
  abstract paginatedList(
    page: number,
    perPage: number,
  ): Promise<Apresentacao[]>;
}
