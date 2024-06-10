import { Cronograma } from '@domains/Cronograma';
import { format } from 'date-fns';
export class CronogramaViewModel {
  static toHTTP(cronograma: Cronograma) {
    return {
      id: cronograma.id,
      eventos: cronograma.eventos.map((evento) => ({
        id: evento.id,
        title: evento.title,
        value: evento.value,
        periodo: {
          from: format(evento.from, 'dd/MM/yyyy'),
          to: format(evento.to, 'dd/MM/yyyy'),
        },
      })),
    };
  }
}
