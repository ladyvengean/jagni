import nodemailer from 'nodemailer';
import { env, isMailConfigured } from './env.js';

let transporter = null;

// Created once and reused for every request.
export function getTransporter() {
  if (!isMailConfigured) return null;

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.secure,
      auth: { user: env.smtp.user, pass: env.smtp.pass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
  }
  return transporter;
}

export async function verifyMailer() {
  const t = getTransporter();
  if (!t) throw new Error('SMTP is not configured.');
  await t.verify();
}