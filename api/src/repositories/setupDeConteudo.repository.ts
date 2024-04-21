import { SetupDeConteudo } from '../domain/SetupDeConteudo';

export abstract class SetupDeConteudoRepository {
  abstract save(field: SetupDeConteudo): Promise<void>;
  abstract list(): Promise<SetupDeConteudo[]>;
  abstract findByProjetoId(projeto: string): Promise<SetupDeConteudo>;
  abstract findById(id: string): Promise<SetupDeConteudo>;
}
