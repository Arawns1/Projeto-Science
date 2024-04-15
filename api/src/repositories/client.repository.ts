import { Client } from '@domains/Client';

export abstract class ClientRepository {
  abstract save(client: Client): Promise<void>;
  abstract list(): Promise<Client[]>;
  abstract count(): Promise<number>;
}
