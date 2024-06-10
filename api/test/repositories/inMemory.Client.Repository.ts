import { Client } from '@domains/Client';
import { ClientRepository } from '@repositories/client.repository';

export class InMemoryClientRepository implements ClientRepository {
  public clients: Client[] = [];

  async save(client: Client) {
    this.clients.push(client);
  }
  list(): Promise<Client[]> {
    return new Promise((resolve) => {
      resolve(this.clients);
    });
  }
}
