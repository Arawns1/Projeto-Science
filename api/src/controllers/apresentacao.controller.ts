import { saveApresentacaoDTO } from '@dtos/saveApresentacao.dto';
import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { ApresentacaoService } from '../services/apresentacao.service';
import { ApresentacaoViewModel } from './viewModels/apresentacao.viewmodel';
@Controller('apresentacao')
export class ApresentacaoController {
  constructor(private apresentacaoService: ApresentacaoService) {}

  @Post()
  async save(@Body() body: saveApresentacaoDTO) {
    const { apresentacao } = await this.apresentacaoService.save(body);
    return ApresentacaoViewModel.toHTTP(apresentacao);
  }
  @Get()
  async list(
    @Query('_page') page: string,
    @Query('_per_page') perPage: string,
  ) {
    if (page && perPage) {
      const { apresentacao, clientsCount } =
        await this.apresentacaoService.paginatedList({
          page,
          perPage,
        });
      return { apresentacao, clientsCount };
    }
    const { apresentacao } = await this.apresentacaoService.list();
    return apresentacao;
  }
}
