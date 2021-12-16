import dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: process.env.PORT || 8080,
  TOKEN_KEEP_ALIVE: process.env.TOKEN_KEEP_ALIVE || '4h',
  CLOUDINARY_URL: process.env.CLOUDINARY_URL || 'CloudinaryKey',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secreto',
  ENVIROMENT: process.env.NODE_ENV || 'production',
  MONGO_TEST: process.env.MONGO_TEST || 'mongodbtest',
  MONGO_INGRESS: process.env.MONGODbas_INGRESS || 'mongodbaas',
  MONGOLOCAL_INGRESS: process.env.MONGOLOCAL_INGRESS || 'mongolocal',
  SESSION_SECRET: process.env.SESSION_SECRET || 'Elsecreto',
  GMAIL_NAME: process.env.GMAIL_NAME || 'nombre',
  GMAIL_EMAIL: process.env.GMAIL_EMAIL || 'mail',
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD || 'password',
  TWILIO_ACCOUNT_ID: process.env.TWILIO_ACCOUNT_ID || 'twilioId',
  TWILIO_TOKEN: process.env.TWILIO_TOKEN || 'twilioToken',
  TWILIO_CELLPHONE: process.env.TWILIO_CELLPHONE || 'twiloCellphone',
  ETHEREAL_NAME: process.env.ETHEREAL_NAME || 'etherealName',
  ETHEREAL_EMAIL: process.env.ETHEREAL_EMAIL || 'etherealEmail',
  ETHEREAL_PASSWORD: process.env.ETHEREAL_PASSWORD || 'etherealPassword',
  SESSION_COOKIE_TIMEOUT_MIN: parseInt(
    process.env.SESSION_COOKIE_TIMEOUT_MIN || '10',
  ),
};
