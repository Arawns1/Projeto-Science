import { Diagnostico } from '@domains/Diagnostico';

export abstract class DiagnosticoRepository {
  abstract save(diagnostico: Diagnostico): Promise<Diagnostico>;
  abstract list(): Promise<Diagnostico[]>;
  abstract delete(diagnosticoId: string): Promise<void>;
}
