import { Resend } from 'resend';

let client;

function getResend() {
  if (!client) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error('RESEND_API_KEY is not configured');
    client = new Resend(key);
  }
  return client;
}

export function getEmailConfig() {
  const from = process.env.EMAIL_FROM || 'Sujan Selven <noreply@sujanselven.org>';
  const to = process.env.EMAIL_TO || 'info@sujanselven.org';
  return { from, to };
}

/**
 * @param {{ to: string | string[]; subject: string; html: string; replyTo?: string; attachments?: object[] }} opts
 */
export async function sendMail({ to, subject, html, replyTo, attachments }) {
  const { from } = getEmailConfig();
  const resend = getResend();
  const { data, error } = await resend.emails.send({
    from,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
    ...(attachments?.length ? { attachments } : {}),
  });
  if (error) {
    const message = error.message || 'Failed to send email';
    throw new Error(message);
  }
  return data;
}
