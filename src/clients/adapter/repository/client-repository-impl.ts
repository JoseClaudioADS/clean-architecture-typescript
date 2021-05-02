import { getRepository, Repository } from "typeorm";
import ClientEntity from "../../../infra/database/entity/ClientEntity";
import Client from "../../entity/client";
import ClientRepository from "../../repository/client-repository";

export default class ClientRepositoryImpl implements ClientRepository {
  private clientRepository!: Repository<ClientEntity>;

  private getClientRepository(): Repository<ClientEntity> {
    if (!this.clientRepository) {
      this.clientRepository = getRepository(ClientEntity);
    }

    return this.clientRepository;
  }

  async save(client: Client): Promise<void> {
    const clientEntity = new ClientEntity(
      client.name,
      client.email.value,
      client.birthday
    );
    await this.getClientRepository().save(clientEntity);
  }

  countByEmail(email: string): Promise<number> {
    return this.getClientRepository().count({ email });
  }
}
