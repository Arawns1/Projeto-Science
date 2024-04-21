import { FunilFormato } from '../domain/FunilFormato';

export abstract class FunilFormatoRepository {
  abstract save(field: FunilFormato): Promise<void>;
  abstract list(): Promise<FunilFormato[]>;
  abstract findByProjetoId(projeto: string): Promise<FunilFormato>;
  abstract findById(id: string): Promise<FunilFormato>;
}
