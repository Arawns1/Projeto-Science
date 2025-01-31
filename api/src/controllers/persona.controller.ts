/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Logger, Param, Post, Query } from '@nestjs/common';
import { PersonaService } from '../services/persona.service';
import { PersonaViewModel } from './viewModels/persona.viewmodel';
import { savePersonaDTO } from '@dtos/savePersonaDTO';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('persona')
@Controller('persona')
export class PersonaController {
  constructor(private personaService: PersonaService) {}

  @Post()
  async save(@Body() body: savePersonaDTO) {
    const { persona } = await this.personaService.save(body);
    return PersonaViewModel.toHTTP(persona);
  }

  @Get()
  async list() {
    const { personas } = await this.personaService.list();
    return personas.map(persona => PersonaViewModel.toHTTP(persona));
  }

  @Delete(':personaId')
  async deleteByPersonaId(@Param('personaId') id: string) {
    Logger.log(`Deleting persona with id: ${id}`);
    await this.personaService.deleteByPersonaId(id);
  }
}
