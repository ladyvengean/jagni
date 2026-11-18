import dotenv from 'dotenv';

dotenv.config();

const REQUIRED_MAIL_VARS = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'CONTACT_TO_EMAIL',
  'MAIL_FROM_EMAIL',
];

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  port: Number(process.env.PORT) || 5000,
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  contactTo: process.env.CONTACT_TO_EMAIL,
  mailFrom: process.env.MAIL_FROM_EMAIL,
};

export const missingMailVars = REQUIRED_MAIL_VARS.filter((key) => !process.env[key]);
export const isMailConfigured = missingMailVars.length === 0;