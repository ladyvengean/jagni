import { env, useResend } from '../config/env.js';
import { getTransporter } from '../config/mailer.js';

export async function sendEnquiryMail({ subject, html, text, replyTo }) {
  if (useResend) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Jagni Homes Website <onboarding@resend.dev>',
        to: [env.contactTo],
        subject,
        html,
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`Resend ${res.status}: ${body.slice(0, 200)}`);
    }
    return;
  }

  const info = await getTransporter().sendMail({
    from: `"Jagni Homes Website" <${env.mailFrom}>`,
    to: env.contactTo,
    subject,
    html,
    text,
    ...(replyTo ? { replyTo } : {}),
  });

  if (!Array.isArray(info.accepted) || info.accepted.length === 0) {
    throw new Error('SMTP server did not accept any recipient.');
  }
}