import { isMailConfigured, missingMailVars } from '../config/env.js';
import { verifyMailer } from '../config/mailer.js';

if (!isMailConfigured) {
  console.error(`SMTP not configured. Missing: ${missingMailVars.join(', ')}`);
  process.exit(1);
}

try {
  await verifyMailer();
  console.log('SMTP connection and login verified successfully.');
} catch (err) {
  console.error('SMTP verification failed:', err.code || err.message);
  process.exit(1);
}