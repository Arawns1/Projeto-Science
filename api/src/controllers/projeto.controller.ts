/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Logger, Param, Post, Query } from '@nestjs/common';
import { ProjetoService } from '../services/projeto.service';
import { saveProjetoDTO } from '@dtos/saveProjeto.dto';
import { ProjetoViewModel } from './viewModels/projeto.viewmodel';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('projeto')
@Controller('projeto')
export class ProjetoController {
  constructor(private projetoService: ProjetoService) {}

  @Post()
  async save(@Body() body: saveProjetoDTO) {
    const { projeto } = await this.projetoService.save(body);
    return ProjetoViewModel.toHTTP(projeto);
  }

  @Get()
  async list() {
    const { projeto } = await this.projetoService.list();
    return projeto.map(projeto => ProjetoViewModel.toHTTP(projeto));
  }

  @Get('client/:clientId')
  async findProjetoByClientId(@Param('clientId') clientId: string) {
    const { projeto } = await this.projetoService.findProjetoByClientId(clientId);
    return ProjetoViewModel.toHTTP(projeto);
  }
}
