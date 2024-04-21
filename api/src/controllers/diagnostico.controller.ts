/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DiagnosticoService } from '../services/diagnostico.service';
import { DiagnosticoViewModel } from './viewModels/diagnostico.viewmodel';
import { saveDiagnosticoDTO } from '@dtos/saveDiagnostico.dto';

@Controller('diagnostico')
export class DiagnosticoController {
  constructor(private diagnosticoService: DiagnosticoService) {}

  @Post()
  async save(@Body() body: saveDiagnosticoDTO) {
    const { diagnostico } = await this.diagnosticoService.save(body);
    return DiagnosticoViewModel.toHTTP(diagnostico);
  }

  @Get()
  async list() {
    const { diagnostico } = await this.diagnosticoService.list();
    return diagnostico;
  }

  @Get('client/:clientId')
  async findDiagnosticoByClientId(@Param('clientId') clientId: string) {
    const { diagnostico } =
      await this.diagnosticoService.findDiagnosticoByClientId(clientId);
    return diagnostico;
  }
}
