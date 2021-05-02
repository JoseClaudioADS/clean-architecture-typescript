import { EmailService, SendEmailVO } from "../../../infra/email/email-service";
import CreateClientDto from "../../dto/create-client-dto";
import Client from "../../entity/client";
import { EmailAlreadyUsedError } from "../../errors/client-error";
import ClientRepository from "../../repository/client-repository";
import CreateClientUseCase from "../../usecase/create-client-usecase";

export default class CreateClientUseCaseImpl implements CreateClientUseCase {
  constructor(
    private clientRepository: ClientRepository,
    private emailService: EmailService
  ) {}

  private async checkEmail(email: string): Promise<void> {
    const countByEmail = await this.clientRepository.countByEmail(email);

    if (countByEmail > 0) {
      //Use pattern Either left and right instead this -> basically same as functional programming languages does
      throw new EmailAlreadyUsedError();
    }
  }

  private async sendBirthdayEmail(client: Client): Promise<void> {
    if (client.isBirthdayMonth()) {
      const emailVO: SendEmailVO = {
        from: "Clean Architecture <no-reply@cleanarchitecture.com>",
        to: client.email.value,
        subject: "It's you birthday! And we have a gift for you!!!",
        content: "Lorem ipsum dolor sit amet.",
      };

      await this.emailService.send(emailVO);
    }
  }

  async create(createClientDTO: CreateClientDto): Promise<Client> {
    const client = new Client(
      createClientDTO.name,
      createClientDTO.email,
      createClientDTO.birthday
    );

    await this.checkEmail(client.email.value);
    await this.clientRepository.save(client);
    await this.sendBirthdayEmail(client);

    return client;
  }
}
