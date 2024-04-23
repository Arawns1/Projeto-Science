import { Cronograma } from '@domains/Cronograma';

export abstract class CronogramaRepository {
  abstract save(concorrente: Cronograma): Promise<void>;
  abstract list(): Promise<Cronograma[]>;
}
