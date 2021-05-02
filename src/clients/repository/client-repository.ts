import Client from "../entity/client";

export default interface ClientRepository {
  save(client: Client): Promise<void>;
  countByEmail(email: string): Promise<number>;
}
