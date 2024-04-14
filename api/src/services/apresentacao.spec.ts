import { saveApresentacaoDTO } from './../dtos/saveApresentacao.dto';
import { InMemoryApresentacaoRepository } from '../../test/repositories/inMemory.Apresentacao.Repository';
import { ApresentacaoService } from '../services/apresentacao.service';
import { InMemoryClientRepository } from '@test/repositories/inMemory.Client.Repository';

describe('Apresentação service', () => {
  it('deve salvar uma apresentacao', async () => {
    const apresentacaoRepository = new InMemoryApresentacaoRepository();
    const clientRepository = new InMemoryClientRepository();
    const apresentacaoService = new ApresentacaoService(
      apresentacaoRepository,
      clientRepository,
    );

    const apresentacaoDTO = new saveApresentacaoDTO(
      'Nome',
      'contato',
      'email',
      'Senha12345',
      'userPhotoBinary',
      'sobre',
    );

    const { apresentacao } = await apresentacaoService.save(apresentacaoDTO);
    expect(apresentacaoRepository.apresentacoes).toHaveLength(1);
    expect(apresentacaoRepository.apresentacoes.at(0)).toEqual(apresentacao);
  });
});
