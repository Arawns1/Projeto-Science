import { Concorrente } from '@domains/Concorrente';

export abstract class ConcorrenteRepository {
  abstract save(concorrente: Concorrente): Promise<void>;
  abstract saveAll(concorrentes: Concorrente[]): Promise<void>;
  abstract list(): Promise<Concorrente[]>;
  abstract findByDiagnosticoId(diagnosticoId: string): Promise<Concorrente[]>;
  abstract delete(concorrenteId: string): Promise<void>;
}
