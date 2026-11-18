import dotenv from 'dotenv';

dotenv.config();

const SMTP_VARS = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'CONTACT_TO_EMAIL',
  'MAIL_FROM_EMAIL',
];
const RESEND_VARS = ['RESEND_API_KEY', 'CONTACT_TO_EMAIL'];

// If RESEND_API_KEY is set, mail goes over HTTPS. Otherwise it uses SMTP.
export const useResend = Boolean(process.env.RESEND_API_KEY);

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
  resendKey: process.env.RESEND_API_KEY,
  contactTo: process.env.CONTACT_TO_EMAIL,
  mailFrom: process.env.MAIL_FROM_EMAIL,
};

const required = useResend ? RESEND_VARS : SMTP_VARS;
export const missingMailVars = required.filter((key) => !process.env[key]);
export const isMailConfigured = missingMailVars.length === 0;