import { createHash } from 'node:crypto';
import { renderContactEmail } from '../../server/email/contact-template.mjs';

// Netlify signs and verifies platform event invocations. Keep this reserved
// filename: do not expose this handler as a generic public email endpoint.
export default async function submissionCreated(request) {
  const { payload } = await request.json();
  if (payload?.form_name !== 'contact') return new Response(null, { status: 204 });
  // Opt-in activation preserves the existing Netlify notification until ready.
  if (process.env.CONTACT_EMAIL_ENABLED !== 'true') return new Response(null, { status: 204 });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM;
  const to = process.env.CONTACT_EMAIL_TO;
  if (!apiKey || !from || !to) throw new Error('Missing contact email server configuration');
  if (!payload.id || !payload.data || typeof payload.data !== 'object') {
    throw new Error('Invalid contact submission event');
  }
  // Fixed server-side recipients; visitor-supplied fields never choose recipients.
  const recipients = to.split(',').map(value => value.trim()).filter(Boolean);
  if (!recipients.length || recipients.some(value => !/^[^\s<>"@]+@[^\s<>"@]+\.[^\s<>"@]+$/.test(value))) {
    throw new Error('Invalid contact email recipients');
  }
  const content = renderContactEmail(payload.data);
  const body = JSON.stringify({ from, to: recipients, ...content });
  const key = createHash('sha256').update(String(payload.id)).digest('hex');
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': `contact/${key}`,
    },
    body,
    signal: AbortSignal.timeout(8000),
  });
  // Do not log the payload: it contains visitors' personal information.
  if (!response.ok) throw new Error(`Contact email delivery request failed (${response.status})`);
  return new Response(null, { status: 204 });
}
