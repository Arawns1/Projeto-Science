import { saveApresentacaoDTO } from './saveApresentacao.dto';

export type updateApresentacaoDTO = Omit<saveApresentacaoDTO, 'senha'>;
