import { Projeto } from '../domain/Projeto';

export abstract class ProjetoRepository {
  abstract save(projeto: Projeto): Promise<Projeto>;
  abstract list(): Promise<Projeto[]>;
  abstract findByClientId(clientId: string): Promise<Projeto>;
  abstract findById(id: string): Promise<Projeto>;
}
