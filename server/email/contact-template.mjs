const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

const field = (value, fallback = 'Non renseigné') => typeof value === 'string' && value.trim() ? value.trim() : fallback;

export function renderContactEmail(data) {
  const name = field(data.name);
  const company = field(data.company);
  const email = field(data.email, '');
  const phone = field(data.phone);
  const service = field(data.service, 'À préciser');
  const message = field(data.message);
  // Never interpret visitor input as HTML, email headers, or a URL scheme.
  const validEmail = /^[^\s<>"@]+@[^\s<>"@]+\.[^\s<>"@]+$/.test(email);
  const subject = `Nouvelle demande · ${service} · ${name}`.replace(/[\r\n]+/g, ' ').slice(0, 180);
  const replyHref = validEmail ? `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: Votre demande — ${service}`)}` : null;
  const row = (label, value) => `<tr><td style="padding:14px 0;border-bottom:1px solid #e8edf3;width:105px;vertical-align:top;color:#64748b;font-size:13px;">${label}</td><td style="padding:14px 0;border-bottom:1px solid #e8edf3;vertical-align:top;color:#212d55;font-size:14px;font-weight:600;word-break:break-word;overflow-wrap:anywhere;">${escapeHtml(value)}</td></tr>`;
  const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:0;background:#f1f4f8;font-family:Arial,Helvetica,sans-serif;color:#212d55;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${escapeHtml(name)} vous contacte pour ${escapeHtml(service)}.</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f1f4f8;"><tr><td align="center" style="padding:32px 12px;">
<!--[if mso]><table role="presentation" width="600"><tr><td><![endif]-->
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
<tr><td style="height:5px;background:#ea570d;font-size:1px;line-height:5px;">&nbsp;</td></tr>
<tr><td style="padding:28px;background:#212d55;">
  <p style="margin:0;color:#ffffff;font-size:25px;font-weight:700;letter-spacing:-1px;">Telly <span style="color:#ff9a63;">InTech</span></p>
  <p style="margin:8px 0 0;color:#cbd5e1;font-size:11px;letter-spacing:2px;">TRANSFORMER. INNOVER. CONNECTER.</p>
</td></tr>
<tr><td style="padding:30px 28px 12px;">
  <p style="margin:0 0 12px;color:#b9440a;font-size:11px;font-weight:700;letter-spacing:2px;">NOUVEAU CONTACT</p>
  <h1 style="margin:0 0 12px;font-size:28px;line-height:1.25;letter-spacing:-0.7px;color:#212d55;">Une nouvelle demande<br>pour votre équipe.</h1>
  <p style="margin:0 0 22px;color:#64748b;font-size:14px;line-height:1.7;">${escapeHtml(name)} a rempli le formulaire de contact du site Telly InTech.</p>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td style="padding:16px 18px;background:#fff4ed;border-left:3px solid #ea570d;border-radius:4px;">
    <p style="margin:0 0 6px;color:#9a4318;font-size:11px;font-weight:700;letter-spacing:1px;">SERVICE SOUHAITÉ</p>
    <p style="margin:0;color:#212d55;font-size:17px;font-weight:700;overflow-wrap:anywhere;">${escapeHtml(service)}</p>
  </td></tr></table>
</td></tr>
<tr><td style="padding:16px 28px 24px;">
  <h2 style="margin:0 0 6px;font-size:16px;color:#212d55;">Coordonnées du contact</h2>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="table-layout:fixed;">
    ${row('Nom', name)}${row('Entreprise', company)}${row('E-mail', email || 'Non renseigné')}${row('Téléphone', phone)}
  </table>
</td></tr>
<tr><td style="padding:0 28px 28px;">
  <h2 style="margin:0 0 12px;font-size:16px;color:#212d55;">Son message</h2>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="table-layout:fixed;"><tr><td style="background:#f6f8fb;border:1px solid #e8edf3;border-radius:8px;padding:20px;font-size:14px;line-height:1.8;color:#334155;word-break:break-word;overflow-wrap:anywhere;">${escapeHtml(message).replace(/\r?\n/g, '<br>')}</td></tr></table>
  ${replyHref ? `<table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:24px;"><tr><td bgcolor="#ea570d" style="border-radius:6px;text-align:center;mso-padding-alt:15px 24px;"><a href="${escapeHtml(replyHref)}" style="display:inline-block;padding:15px 24px;border:1px solid #ea570d;border-radius:6px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;">Répondre au contact &rarr;</a></td></tr></table><p style="margin:14px 0 0;font-size:12px;line-height:1.6;color:#64748b;">Vous pouvez aussi utiliser le bouton « Répondre » de votre messagerie.</p>` : ''}
</td></tr>
<tr><td style="padding:20px 28px;background:#f8fafc;border-top:1px solid #e8edf3;">
  <p style="margin:0;font-size:12px;line-height:1.7;color:#64748b;">Notification du formulaire de contact · Telly InTech<br>Message destiné à votre équipe.</p>
</td></tr></table>
<!--[if mso]></td></tr></table><![endif]-->
<p style="margin:20px 0 0;font-size:11px;color:#64748b;">Telly InTech — Le numérique au service de vos ambitions.</p>
</td></tr></table></body></html>`;
  const text = `TELLY INTECH — Nouvelle demande\n\nService : ${service}\nNom : ${name}\nEntreprise : ${company}\nE-mail : ${email}\nTéléphone : ${phone}\n\nMessage :\n${message}\n\nRépondre : ${email}`;
  return { subject, html, text, ...(validEmail ? { reply_to: email } : {}) };
}
