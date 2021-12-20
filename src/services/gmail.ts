import Config from '../config';
import nodemailer from 'nodemailer';
import logger from './logger';

interface Owner {
  name: string;
  address: string;
}
class Email {
  private owner: Owner;
  private transporter;

  constructor() {
    this.owner = {
      name: Config.GMAIL_NAME || '',
      address: Config.GMAIL_EMAIL || '',
    };

    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: Config.GMAIL_EMAIL,
        pass: Config.GMAIL_PASSWORD,
      },
    });

    this.transporter.verify().then();
  }

  async sendEmail(dest: string, subject: string, content: string) {
    const mailOptions = {
      from: this.owner,
      to: dest,
      subject,
      html: content,
    };

    await this.transporter.sendMail(mailOptions);
    logger.info('Email enviado');
    return;
  }
}

export const EmailService = new Email();
