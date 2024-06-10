import { Funil } from '../domain/Funil';

export abstract class FunilRepository {
  abstract save(field: Funil): Promise<void>;
  abstract list(): Promise<Funil[]>;
  abstract findByProjetoId(projeto: string): Promise<Funil>;
  abstract findById(id: string): Promise<Funil>;
}
