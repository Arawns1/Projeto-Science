/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProjetoService } from '../services/projeto.service';
import { saveProjetoDTO } from '@dtos/saveProjeto.dto';

@Controller('projeto')
export class ProjetoController {
  constructor(private projetoService: ProjetoService) {}

  @Post()
  async save(@Body() body: saveProjetoDTO) {
    const { projeto } = await this.projetoService.save(body);
    return projeto;
  }

  @Get()
  async list() {
    const { projeto } = await this.projetoService.list();
    return projeto;
  }
}
