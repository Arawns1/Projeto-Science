import { Field } from '../domain/Field';

export abstract class FieldRepository {
  abstract save(field: Field): Promise<void>;
  abstract list(): Promise<Field[]>;
  abstract findByProjetoId(projeto: string): Promise<Field>;
  abstract findById(id: string): Promise<Field>;
}
