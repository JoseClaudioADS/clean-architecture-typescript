export type SendEmailVO = {
  from: string;
  to: string;
  subject: string;
  content: string;
};

export interface EmailService {
  send(sendEmailVO: SendEmailVO): Promise<void>;
}
