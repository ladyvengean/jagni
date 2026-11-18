import { escapeHtml } from './escapeHtml.js';

function row(label, value) {
  if (!value) return '';
  return `
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #e8e2d8;color:#777A61;font-size:12px;letter-spacing:.08em;text-transform:uppercase;width:170px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 16px;border-bottom:1px solid #e8e2d8;color:#262722;font-size:15px;line-height:1.5;">${escapeHtml(value)}</td>
    </tr>`;
}

export function buildEnquiryEmail(data, submittedAt) {
  const timestamp = submittedAt.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const subject = `New Jagni Homes Website Enquiry — ${data.service}`;

  const details = escapeHtml(data.details).replace(/\n/g, '<br>');

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#F6F3ED;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #D8D0C3;">
      <tr>
        <td style="padding:24px 16px;background:#262722;color:#F6F3ED;font-size:20px;letter-spacing:.04em;">
          Jagni Homes <span style="color:#D8D0C3;font-size:13px;">· New website enquiry</span>
        </td>
      </tr>
      <tr><td>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          ${row('Name', data.name)}
          ${row('Phone', data.phone)}
          ${row('Email', data.email)}
          ${row('Service', data.service)}
          ${row('Location', data.location)}
          ${row('Project stage', data.stage)}
          ${row('Budget', data.budget)}
          <tr>
            <td style="padding:10px 16px;color:#777A61;font-size:12px;letter-spacing:.08em;text-transform:uppercase;vertical-align:top;">Project details</td>
            <td style="padding:10px 16px;color:#262722;font-size:15px;line-height:1.6;">${details}</td>
          </tr>
        </table>
      </td></tr>
      <tr>
        <td style="padding:14px 16px;background:#F6F3ED;color:#777A61;font-size:12px;">Submitted: ${escapeHtml(timestamp)} (IST)</td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    'New Jagni Homes website enquiry',
    '',
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    ...(data.email ? [`Email: ${data.email}`] : []),
    `Service: ${data.service}`,
    `Location: ${data.location}`,
    ...(data.stage ? [`Project stage: ${data.stage}`] : []),
    ...(data.budget ? [`Budget: ${data.budget}`] : []),
    '',
    'Project details:',
    data.details,
    '',
    `Submitted: ${timestamp} (IST)`,
  ].join('\n');

  return { subject, html, text };
}