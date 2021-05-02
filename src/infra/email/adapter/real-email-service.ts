import { EmailService, SendEmailVO } from "../email-service";

export default class RealEmailService implements EmailService {
  send(sendEmailVO: SendEmailVO): Promise<void> {
    console.log("Sending email", sendEmailVO);
    return Promise.resolve();
  }
}
