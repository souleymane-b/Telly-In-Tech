import { mkdir, writeFile } from 'node:fs/promises';
import { renderContactEmail } from '../server/email/contact-template.mjs';

const preview = renderContactEmail({
  name: 'Aminata Diallo', company: 'Exemple Studio', email: 'contact@example.com',
  phone: '+224 600 00 00 00', service: 'Création Web',
  message: 'Bonjour,\n\nNous souhaitons créer un site vitrine pour présenter notre activité et faciliter les demandes de devis.\n\nPourriez-vous nous proposer un premier échange cette semaine ?\n\nMerci et à bientôt.',
});
await mkdir(new URL('../artifacts/', import.meta.url), { recursive: true });
await writeFile(new URL('../artifacts/contact-email-preview.html', import.meta.url), preview.html);
console.log('Aperçu créé : artifacts/contact-email-preview.html (données fictives, aucun envoi).');
