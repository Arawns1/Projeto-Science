/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { saveCronogramaDTO } from '@dtos/saveCronogramaDTO';
import { CronogramaViewModel } from './viewModels/cronograma.viewmodel';
import { CronogramaService } from '@services/cronograma.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('cronograma')
@Controller('cronograma')
export class CronogramaController {
  constructor(private cronogramaService: CronogramaService) {}

  @Post()
  async save(@Body() body: saveCronogramaDTO) {
    await this.cronogramaService.save(body);
  }

  @Get()
  async list() {
    const { cronogramas } = await this.cronogramaService.list();
    return cronogramas.map(cronograma => CronogramaViewModel.toHTTP(cronograma));
  }
}
