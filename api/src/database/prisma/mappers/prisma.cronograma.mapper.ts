import { Cronograma } from '@domains/Cronograma';

export class PrismaCronogramaMapper {
  static toPrisma(cronograma: Cronograma) {
    return {
      id: cronograma.id,
      clientId: cronograma.clientId,
    };
  }
}
