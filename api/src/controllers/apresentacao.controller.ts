import { Body, Controller, Post } from '@nestjs/common';
import { ApresentacaoService } from '../services/apresentacao.service';
import { ApresentacaoViewModel } from './viewModels/apresentacao.viewmodel';
import { saveApresentacaoDTO } from '@dtos/saveApresentacao.dto';

@Controller('apresentacao')
export class ApresentacaoController {
  constructor(private apresentacaoService: ApresentacaoService) {}

  @Post()
  async save(@Body() body: saveApresentacaoDTO) {
    const { apresentacao } = await this.apresentacaoService.save(body);
    return { apresentacao: ApresentacaoViewModel.toHTTP(apresentacao) };
  }
}
