export interface SendMailData {
  subject: string;
  body: string;
}

export interface MailMiniService {
  sendMail(data: SendMailData): Promise<void>;
}