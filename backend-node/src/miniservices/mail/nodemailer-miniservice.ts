import { MailMiniService, SendMailData } from "./mail-service";
import nodemailer from 'nodemailer';
import mailtrap from './mailtrap.config.json';

const transport = nodemailer.createTransport(mailtrap);

export class NodemailerMiniservice implements MailMiniService {
  async sendMail({subject, body}: SendMailData): Promise<void> {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Josedoce <josedoce@gmail.com>',
      subject,
      html: body
    });
  }
}