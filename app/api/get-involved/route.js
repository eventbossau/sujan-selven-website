import { getInvolvedSchema } from '@/lib/email/schemas.js';
import { getEmailConfig, sendMail } from '@/lib/email/resend.js';
import { getInvolvedAutoReplyEmail, getInvolvedNotifyEmail, getLogoAttachment } from '@/lib/email/templates.js';
import { clientIp, json, rateLimit } from '@/lib/email/rate-limit.js';

export async function POST(request) {
  try {
    const ip = clientIp(request);
    if (!rateLimit(`get-involved:${ip}`)) {
      return json({ error: 'Too many requests. Please try again shortly.' }, 429);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid request body.' }, 400);
    }

    const parsed = getInvolvedSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      return json({ error: 'Please check the form and try again.', fieldErrors }, 400);
    }

    const data = parsed.data;

    if (data.company) {
      return json({ ok: true });
    }

    const { to } = getEmailConfig();
    const notify = getInvolvedNotifyEmail(data);
    const autoReply = getInvolvedAutoReplyEmail(data);
    const logo = getLogoAttachment();

    await sendMail({
      to,
      replyTo: data.email,
      subject: notify.subject,
      html: notify.html,
      attachments: [logo],
    });

    await sendMail({
      to: data.email,
      replyTo: to,
      subject: autoReply.subject,
      html: autoReply.html,
      attachments: [logo],
    });

    return json({ ok: true });
  } catch (err) {
    console.error('[api/get-involved]', err);
    return json({ error: 'Something went wrong sending your details. Please try again.' }, 500);
  }
}
