import { IdentidadeVisual } from '../domain/IdentidadeVisual';

export abstract class IdentidadeVisualRepository {
  abstract save(identidadeVisual: IdentidadeVisual): Promise<void>;
  abstract list(): Promise<IdentidadeVisual[]>;
  abstract findAllByClientId(clientId: string): Promise<IdentidadeVisual[]>;
  abstract findById(id: string): Promise<IdentidadeVisual>;
}
