import { PersonaProps } from '@domains/Persona';

export class PrismaPersonaMapper {
  static toPrisma(persona: PersonaProps) {
    return {
      id: persona.id,
      personaPhotoPath: persona.personaPhotoPath,
      nome: persona.nome,
      idade: persona.idade,
      profissao: persona.profissao,
      sobre: persona.sobre,
      projetoId: persona.projetoId,
    };
  }
}
