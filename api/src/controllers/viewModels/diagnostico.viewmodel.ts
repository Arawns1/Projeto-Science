import { Diagnostico } from '@domains/Diagnostico';

export class DiagnosticoViewModel {
  static toHTTP(diagnostico: Diagnostico) {
    return {
      id: diagnostico.id,
      value: diagnostico.value,
      pontosFortes: diagnostico.pontosFortes,
      pontosFracos: diagnostico.pontosFracos,
      diferencial: diagnostico.diferencial,
      objetivos: diagnostico.objetivos,
      concorrentes: diagnostico.concorrentes,
      clientId: diagnostico.clientId,
    };
  }
}
