import { Diagnostico } from '@domains/Diagnostico';
import { Concorrente } from '@prisma/client';

export class DiagnosticoViewModel {
  static toHTTP(diagnostico: Diagnostico) {
    return {
      id: diagnostico.id,
      diagnosticos: diagnostico.diagnosticos.map((diagnostico) => ({
        value: diagnostico,
      })),
      pontosFortes: diagnostico.pontosFortes.map((pontoForte) => ({
        value: pontoForte,
      })),
      pontosFracos: diagnostico.pontosFracos.map((pontoFraco) => ({
        value: pontoFraco,
      })),
      diferencial: diagnostico.diferencial,
      objetivos: diagnostico.objetivos.map((objetivo) => ({
        value: objetivo,
      })),
      concorrentes: diagnostico.concorrentes?.map((concorrente) => {
        return this.concorrenteMapper(concorrente);
      }),
      clientId: diagnostico.clientId,
    };
  }

  private static concorrenteMapper(concorrente: Concorrente) {
    return {
      id: concorrente.id,
      nome: concorrente.nome,
      redeSocial: concorrente.redeSocial,
      linkRedeSocial: concorrente.linkRedeSocial,
      descricao: concorrente.descricao,
      pontosFortes: concorrente.pontosFortes.map((pontoForte) => ({
        value: pontoForte,
      })),
      pontosFracos: concorrente.pontosFracos.map((pontoFraco) => ({
        value: pontoFraco,
      })),
    };
  }
}
