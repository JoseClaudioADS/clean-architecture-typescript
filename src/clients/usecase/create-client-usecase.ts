import CreateClientDTO from "../dto/create-client-dto";
import Client from "../entity/client";

export default interface CreateClientUseCase {
  create(createClientDTO: CreateClientDTO): Promise<Client>;
}
