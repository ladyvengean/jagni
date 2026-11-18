import { isMailConfigured } from '../config/env.js';
import { validateContact } from '../utils/validateContact.js';
import { buildEnquiryEmail } from '../utils/emailTemplate.js';
import { sendEnquiryMail } from '../utils/sendEnquiryMail.js';

export async function submitContact(req, res) {
  const result = validateContact(req.body);

  if (!result.ok) {
    return res.status(400).json({
      success: false,
      message: 'Please check the highlighted fields and try again.',
      errors: result.errors,
    });
  }

  const data = result.data;

  // Honeypot triggered: pretend success to the bot, send nothing.
  if (data.website) {
    return res.status(201).json({ success: true, message: 'Enquiry submitted.' });
  }

  if (!isMailConfigured) {
    console.error('[contact] Enquiry rejected: mail is not configured on the server.');
    return res.status(503).json({
      success: false,
      message:
        'Our enquiry service is temporarily unavailable. Please try again later or contact us directly.',
    });
  }

  const { subject, html, text } = buildEnquiryEmail(data, new Date());

  try {
    await sendEnquiryMail({ subject, html, text, replyTo: data.email });

    console.log(`[contact] Enquiry email sent (${data.service}, ${data.location}).`);

    return res.status(201).json({
      success: true,
      message:
        'Thank you for reaching out to Jagni Homes. Your enquiry has been submitted successfully.',
    });
  } catch (err) {
    console.error('[contact] Failed to send enquiry email:', err.code || err.message);
    return res.status(500).json({
      success: false,
      message:
        'We could not submit your enquiry right now. Your details are still on this page, please try again in a moment.',
    });
  }
}