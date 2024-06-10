import { RedeSocial } from '../domain/RedeSocial';

export abstract class RedeSocialRepository {
  abstract save(field: RedeSocial): Promise<void>;
  abstract list(): Promise<RedeSocial[]>;
  abstract findByProjetoId(projeto: string): Promise<RedeSocial>;
  abstract findById(id: string): Promise<RedeSocial>;
}
