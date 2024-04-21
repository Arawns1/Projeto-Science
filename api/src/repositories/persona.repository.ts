import { Persona } from '../domain/Persona';

export abstract class PersonaRepository {
  abstract save(field: Persona): Promise<void>;
  abstract list(): Promise<Persona[]>;
  abstract findByProjetoId(projeto: string): Promise<Persona>;
  abstract findById(id: string): Promise<Persona>;
}
