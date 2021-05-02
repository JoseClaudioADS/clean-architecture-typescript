import Client from "../entity/client";
import CreateClientDTO from "./create-client-dto";

describe("Create client dto", () => {
  it("should be parse a create client dto to client", () => {
    const createClientDTO = new CreateClientDTO();
    createClientDTO.name = "John Doe";
    createClientDTO.email = "JOhN@DOE.com";
    createClientDTO.birthday = new Date();

    const client = new Client(
      createClientDTO.name,
      createClientDTO.email.toLowerCase(),
      createClientDTO.birthday
    );

    expect(createClientDTO.toClient()).toStrictEqual(client);
  });
});
