import twilio from 'twilio';

import logger from '../config/logger';
import Config from '../config';

class Twilio {
  private twilio;
  constructor() {
    this.twilio = twilio(Config.TWILIO_ACCOUNT_ID, Config.TWILIO_TOKEN);
  }

  async sendMessage(cellphoneNumber: string, message: string) {
    const params = {
      body: message,
      from: Config.TWILIO_CELLPHONE,
      to: cellphoneNumber,
    };

    await this.twilio.messages.create(params);
    logger.info('Sms enviado');
    return;
  }
  async sendMessageWhatsapp(cellphoneNumber: string, message: string) {
    const params = {
      body: message,
      from: `whatsapp:${Config.TWILIO_CELLPHONE}`,
      to: `whatsapp:${cellphoneNumber}`,
    };

    await this.twilio.messages.create(params);
    logger.info('Whatsapp enviado');
    return;
  }
}

export const SmsService = new Twilio();
