import { Persona } from '../domain/Persona';

export abstract class PersonaRepository {
  abstract save(persona: Persona): Promise<Persona>;
  abstract findById(personaId: string): Promise<Persona>;
  abstract findAllByProjetoId(projetoId: string): Promise<Persona[]>;
  abstract update(persona: Persona): Promise<Persona>;
  abstract list(): Promise<Persona[]>;
  abstract delete(personaId: string): Promise<void>;
}
