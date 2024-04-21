import { Diagnostico } from '@prisma/client';

export class PrismaDiagnosticoMapper {
  static toPrisma(diagnostico: Diagnostico) {
    return {
      id: diagnostico.id,
      value: diagnostico.value,
      pontosFortes: diagnostico.pontosFortes,
      pontosFracos: diagnostico.pontosFracos,
      diferencial: diagnostico.diferencial,
      objetivos: diagnostico.objetivos,
      clientId: diagnostico.clientId,
    };
  }
}
