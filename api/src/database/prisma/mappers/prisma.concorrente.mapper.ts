import { Concorrente } from '@domains/Concorrente';

export class PrismaConcorrenteMapper {
  static toPrisma(concorrente: Concorrente) {
    return {
      id: concorrente.id,
      nome: concorrente.nome,
      redeSocial: concorrente.redeSocial,
      linkRedeSocial: concorrente.linkRedeSocial,
      descricao: concorrente.descricao,
      pontosFortes: concorrente.pontosFortes,
      pontosFracos: concorrente.pontosFracos,
      diagnosticoId: concorrente.diagnosticoId,
    };
  }
}
