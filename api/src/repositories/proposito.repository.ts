import { Proposito } from './../domain/Proposito';

export abstract class PropositoRepository {
  abstract save(field: Proposito): Promise<void>;
  abstract list(): Promise<Proposito[]>;
  abstract findByProjetoId(projeto: string): Promise<Proposito>;
  abstract findById(id: string): Promise<Proposito>;
}
