import { Projeto } from '@domains/Projeto';

export class PrismaProjetoMapper {
  static toPrisma(projeto: Projeto) {
    return {
      id: projeto.id,
      dna_estilo: projeto.dna_estilo,
      dna_valores: projeto.dna_valores,
      dna_personalidade: projeto.dna_personalidade,
      dna_comunicacao: projeto.dna_comunicacao,
      palavrasChave: projeto.palavrasChave,
      linkPlanilhaPalavras: projeto.linkPlanilhaPalavras,
      clientId: projeto.clientId,
    };
  }
}
