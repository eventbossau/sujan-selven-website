import fs from 'fs';
import path from 'path';
import { contactTypeLabel } from './schemas.js';

const GREEN = '#009639';
const GREEN_DEEP = '#064E31';
const GREEN_SOFT = '#E8F5EE';
const INK = '#111111';
const MUTED = '#5c5c5c';
const BORDER = '#e8e8e8';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sujanselven.org';
const LOGO_CID = 'sujan-wordmark';

export function getLogoAttachment() {
  const logoPath = path.join(process.cwd(), 'public/assets/logo/sujan-wordmark-green.png');
  return {
    filename: 'sujan-wordmark-green.png',
    content: fs.readFileSync(logoPath),
    contentId: LOGO_CID,
  };
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function row(label, value, { html = false } = {}) {
  if (!value) return '';
  return `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid ${BORDER};vertical-align:top;width:120px;font:700 11px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;text-transform:uppercase;letter-spacing:0.1em;color:${MUTED};">
        ${escapeHtml(label)}
      </td>
      <td style="padding:14px 0;border-bottom:1px solid ${BORDER};font:400 15px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${INK};white-space:pre-wrap;">
        ${html ? value : escapeHtml(value)}
      </td>
    </tr>`;
}

function ctaButton(href, label) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 8px;">
      <tr>
        <td style="background:${GREEN};">
          <a href="${escapeHtml(href)}" style="display:inline-block;padding:14px 22px;font:700 13px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;letter-spacing:0.06em;text-transform:uppercase;text-decoration:none;color:#ffffff;">
            ${escapeHtml(label)}
          </a>
        </td>
      </tr>
    </table>`;
}

function layout({ title, intro, bodyHtml, eyebrow }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f0f2f1;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f1;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;border:1px solid ${BORDER};">
          <tr>
            <td style="padding:0;height:6px;background:${GREEN};font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px;">
              <a href="${SITE_URL}" style="text-decoration:none;">
                <img
                  src="cid:${LOGO_CID}"
                  alt="Sujan Selven"
                  width="200"
                  height="45"
                  style="display:block;width:200px;height:auto;border:0;outline:none;"
                />
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 36px;">
              ${
                eyebrow
                  ? `<p style="margin:0 0 10px;font:700 11px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;letter-spacing:0.12em;text-transform:uppercase;color:${GREEN};">${escapeHtml(eyebrow)}</p>`
                  : ''
              }
              <h1 style="margin:0 0 14px;font:700 26px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${INK};">
                ${escapeHtml(title)}
              </h1>
              ${
                intro
                  ? `<p style="margin:0 0 28px;font:400 16px/1.55 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${MUTED};">${escapeHtml(intro)}</p>`
                  : ''
              }
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:22px 32px;border-top:1px solid ${BORDER};background:${GREEN_SOFT};">
              <p style="margin:0 0 8px;font:400 12px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${MUTED};">
                Authorised by The Greens NSW.
              </p>
              <p style="margin:0;font:400 12px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${MUTED};">
                <a href="${SITE_URL}/privacy" style="color:${GREEN_DEEP};text-decoration:underline;">Privacy</a>
                &nbsp;·&nbsp;
                <a href="${SITE_URL}" style="color:${GREEN_DEEP};text-decoration:underline;">sujanselven.org</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function fieldsTable(rowsHtml) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;border:1px solid ${BORDER};">
      <tr>
        <td style="padding:8px 20px 4px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowsHtml}</table>
        </td>
      </tr>
    </table>`;
}

function prose(...paragraphs) {
  return paragraphs
    .filter(Boolean)
    .map(
      (p) =>
        `<p style="margin:0 0 16px;font:400 16px/1.55 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${INK};">${p}</p>`
    )
    .join('');
}

export function contactNotifyEmail(data) {
  const typeLabel = contactTypeLabel(data.type);
  const subject = `Contact: ${typeLabel} — ${data.name}`;
  const emailLink = `<a href="mailto:${escapeHtml(data.email)}" style="color:${GREEN_DEEP};">${escapeHtml(data.email)}</a>`;
  const html = layout({
    eyebrow: 'Website form',
    title: 'New contact message',
    intro: 'A message was submitted on the contact form. Reply directly to this email to respond to them.',
    bodyHtml: fieldsTable(
      [
        row('About', typeLabel),
        row('Name', data.name),
        row('Email', emailLink, { html: true }),
        row('Phone', data.phone),
        row('Suburb', data.suburb),
        row('Message', data.message),
        row('Updates', data.updates ? 'Yes — wants email updates' : 'No'),
      ].join('')
    ),
  });
  return { subject, html };
}

export function contactAutoReplyEmail(data) {
  const subject = 'Thanks for contacting Sujan Selven';
  const first = data.name.split(' ')[0] || data.name;
  const html = layout({
    eyebrow: 'Message received',
    title: 'We’ve got your message',
    intro: null,
    bodyHtml: [
      prose(
        `Hi ${escapeHtml(first)},`,
        'Thanks for getting in touch with Sujan Selven. Your message has been received and someone from the team will read it.',
        `If your enquiry is urgent, you can also reach us at <a href="mailto:info@sujanselven.org" style="color:${GREEN_DEEP};">info@sujanselven.org</a>.`
      ),
      ctaButton(SITE_URL, 'Visit the website'),
      `<p style="margin:20px 0 0;font:400 16px/1.55 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${INK};">— The Sujan Selven team</p>`,
    ].join(''),
  });
  return { subject, html };
}

export function getInvolvedNotifyEmail(data) {
  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const subject = `Volunteer: ${data.help} — ${fullName}`;
  const emailLink = `<a href="mailto:${escapeHtml(data.email)}" style="color:${GREEN_DEEP};">${escapeHtml(data.email)}</a>`;
  const html = layout({
    eyebrow: 'Website form',
    title: 'New volunteer signup',
    intro: 'Someone signed up on the Get Involved form. Reply directly to this email to follow up.',
    bodyHtml: fieldsTable(
      [
        row('Name', fullName),
        row('Email', emailLink, { html: true }),
        row('Mobile', data.mobile),
        row('Postcode', data.postcode),
        row('Help', data.help),
        row('Updates', data.updates ? 'Yes — wants email updates' : 'No'),
      ].join('')
    ),
  });
  return { subject, html };
}

export function getInvolvedAutoReplyEmail(data) {
  const subject = 'Thanks for signing up';
  const html = layout({
    eyebrow: 'You’re on the list',
    title: 'Thanks for signing up',
    intro: null,
    bodyHtml: [
      prose(
        `Hi ${escapeHtml(data.firstName)},`,
        `Thanks for putting your hand up to help. We’ve got your details${
          data.help
            ? ` — especially your interest in <strong>${escapeHtml(data.help)}</strong>`
            : ''
        } — and someone from the team will be in touch.`
      ),
      ctaButton(SITE_URL, 'Visit the website'),
      `<p style="margin:20px 0 0;font:400 16px/1.55 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${INK};">— The Sujan Selven team</p>`,
    ].join(''),
  });
  return { subject, html };
}
