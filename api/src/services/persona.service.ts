import { Persona } from '@domains/Persona';
import { savePersonaDTO } from '@dtos/savePersonaDTO';
import { Injectable } from '@nestjs/common';
import { PersonaRepository } from '@repositories/persona.repository';
import * as fs from 'fs';
import { cwd } from 'process';

interface PersonaListResponse {
  personas: Persona[];
}
interface PersonaResponse {
  persona: Persona;
}

@Injectable()
export class PersonaService {
  constructor(private personaRepository: PersonaRepository) {}

  async list(): Promise<PersonaListResponse> {
    const personas = await this.personaRepository.list();

    return {
      personas,
    };
  }

  async save(personaDTO: savePersonaDTO): Promise<PersonaResponse> {
    const mappedPersona: Persona = this.personaFromProjetoDTO(personaDTO);
    const persona = await this.personaRepository.save(mappedPersona);
    return { persona };
  }

  async deleteByPersonaId(personaId: string): Promise<void> {
    const persona = await this.personaRepository.findById(personaId);
    if (persona.personaPhotoPath) {
      fs.unlinkSync(cwd() + persona.personaPhotoPath);
    }
    await this.personaRepository.delete(personaId);
  }

  private personaFromProjetoDTO(personaDTO: savePersonaDTO) {
    return new Persona({
      nome: personaDTO.nome,
      idade: personaDTO.idade,
      profissao: personaDTO.profissao,
      sobre: personaDTO.sobre,
      personaPhotoPath: null,
    });
  }
}
