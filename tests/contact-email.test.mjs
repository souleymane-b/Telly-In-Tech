import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../netlify/functions/submission-created.mjs';
import { renderContactEmail } from '../server/email/contact-template.mjs';

test('escapes visitor HTML, preserves lines and rejects unsafe reply addresses', () => {
  const email = renderContactEmail({ name: '<img src=x onerror=alert(1)>', service: 'Web\r\nBcc: injected', message: '<script>bad()</script>\nDeuxième ligne', email: 'x@example.com\r\nBcc: y@example.com' });
  assert.ok(!email.html.includes('<script>'));
  assert.ok(!email.html.includes('<img src=x'));
  assert.ok(email.html.includes('&lt;script&gt;bad()&lt;/script&gt;<br>Deuxième ligne'));
  assert.ok(!/[\r\n]/.test(email.subject));
  assert.equal(email.reply_to, undefined);
  assert.ok(!email.html.includes('href="mailto:'));
});

test('provides a text alternative and a reply button for a valid contact', () => {
  const email = renderContactEmail({ name: 'Aminata', email: 'aminata@example.com', message: 'Bonjour' });
  assert.equal(email.reply_to, 'aminata@example.com');
  assert.ok(email.html.includes('mailto:aminata%40example.com'));
  assert.ok(email.text.includes('Bonjour'));
  assert.ok(email.html.includes('Non renseigné'));
});

test('event routing, configuration, fixed recipients, idempotency and provider failures', async (t) => {
  const keys = ['CONTACT_EMAIL_ENABLED', 'RESEND_API_KEY', 'CONTACT_EMAIL_FROM', 'CONTACT_EMAIL_TO'];
  const saved = keys.map(key => [key, process.env[key]]);
  const originalFetch = globalThis.fetch;
  t.after(() => {
    globalThis.fetch = originalFetch;
    for (const [key, value] of saved) { if (value === undefined) delete process.env[key]; else process.env[key] = value; }
  });
  let calls = [];
  globalThis.fetch = async (url, options) => { calls.push({ url, options }); return new Response('{}', { status: 200 }); };
  const payload = { id: 'submission-1', form_name: 'contact', data: { name: 'Test', email: 'visitor@example.com', message: 'Test', to: 'attacker@example.com' } };
  const request = (value = payload) => new Request('https://example.com', { method: 'POST', body: JSON.stringify({ payload: value }) });
  process.env.CONTACT_EMAIL_ENABLED = 'false';
  await handler(request());
  assert.equal(calls.length, 0);
  process.env.CONTACT_EMAIL_ENABLED = 'true';
  await handler(request({ ...payload, form_name: 'newsletter' }));
  assert.equal(calls.length, 0);
  delete process.env.RESEND_API_KEY;
  await assert.rejects(handler(request()), /Missing contact email/);
  process.env.RESEND_API_KEY = 'test-key';
  process.env.CONTACT_EMAIL_FROM = 'Telly InTech <contact@example.com>';
  process.env.CONTACT_EMAIL_TO = 'souleymane9700@gmail.com';
  await handler(request());
  await handler(request());
  assert.equal(calls[0].url, 'https://api.resend.com/emails');
  const body = JSON.parse(calls[0].options.body);
  assert.deepEqual(body.to, ['souleymane9700@gmail.com']);
  assert.equal(body.reply_to, 'visitor@example.com');
  assert.equal(calls[0].options.headers['Idempotency-Key'], calls[1].options.headers['Idempotency-Key']);
  await handler(request({ ...payload, id: 'submission-2' }));
  assert.notEqual(calls[0].options.headers['Idempotency-Key'], calls[2].options.headers['Idempotency-Key']);
  globalThis.fetch = async () => new Response('{}', { status: 429 });
  await assert.rejects(handler(request()), /failed \(429\)/);
  globalThis.fetch = async () => { throw new Error('Network unavailable'); };
  await assert.rejects(handler(request()), /Network unavailable/);
});
