import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Persona } from '@domains/Persona';
import { PrismaPersonaMapper } from '../mappers/prisma.persona.mapper';
import { PersonaRepository } from '@repositories/persona.repository';

@Injectable()
export class PrismaPersonaRepository implements PersonaRepository {
  constructor(private prismaService: PrismaService) {}

  async update(persona: Persona): Promise<Persona> {
    const updatedPersona = await this.prismaService.persona.update({
      where: {
        id: persona.id,
      },
      data: {
        nome: persona.nome,
        idade: persona.idade,
        profissao: persona.profissao,
        sobre: persona.sobre,
        personaPhotoPath: persona.personaPhotoPath,
      },
    });
    return updatedPersona as unknown as Persona;
  }

  async findById(personaId: string): Promise<Persona> {
    const persona = await this.prismaService.persona.findUnique({
      where: { id: personaId },
    });

    return persona as unknown as Persona;
  }

  async save(persona: Persona): Promise<Persona> {
    const raw = PrismaPersonaMapper.toPrisma(persona);
    const savedPersona = await this.prismaService.persona.create({
      data: raw,
    });
    return savedPersona as unknown as Persona;
  }

  async list(): Promise<Persona[]> {
    const personas = await this.prismaService.persona.findMany({});
    return personas as unknown as Persona[];
  }

  async delete(personaId: string): Promise<void> {
    await this.prismaService.persona.delete({
      where: { id: personaId },
    });
  }
}
