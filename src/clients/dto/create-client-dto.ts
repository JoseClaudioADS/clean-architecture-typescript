import Client from "../entity/client";

export default class CreateClientDTO {
  public name!: string;
  public email!: string;
  public birthday!: Date;

  public toClient(): Client {
    const client = new Client(
      this.name,
      this.email ? this.email.toLowerCase() : this.email,
      this.birthday
    );
    return client;
  }
}
