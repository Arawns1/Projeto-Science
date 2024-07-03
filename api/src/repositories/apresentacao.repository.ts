import { Apresentacao } from '../domain/Apresentacao';

export abstract class ApresentacaoRepository {
  abstract save(apresentacao: Apresentacao): Promise<void>;
  abstract update(client: Apresentacao): Promise<Apresentacao>;
  abstract list(): Promise<Apresentacao[]>;
  abstract paginatedList(page: number, perPage: number): Promise<Apresentacao[]>;
  abstract searchByName(name: string): Promise<Apresentacao[]>;
  abstract findByClientId(clientId: string): Promise<Apresentacao>;
  abstract findById(id: string): Promise<Apresentacao>;
}
