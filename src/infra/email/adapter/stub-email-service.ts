import { EmailService, SendEmailVO } from "../email-service";

export default class StubEmailService implements EmailService {
  send(sendEmailVO: SendEmailVO): Promise<void> {
    console.log("Sending stub email", sendEmailVO);
    return Promise.resolve();
  }
}
