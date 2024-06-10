import { Persona } from '@domains/Persona';

export class PersonaViewModel {
  static toHTTP(persona: Persona) {
    return {
      id: persona.id,
      userPhoto: persona.personaPhotoPath,
      nome: persona.nome,
      idade: persona.idade,
      profissao: persona.profissao,
      sobre: persona.sobre,
    };
  }
}
