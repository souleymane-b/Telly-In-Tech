# Réception des demandes de contact

Le formulaire utilise Netlify Forms. Il ne dépend plus de Supabase.
Une soumission acceptée par Netlify ne garantit pas la livraison d'un e-mail :
les notifications doivent être activées dans le tableau de bord.

## Activation

1. Ouvrir le projet `tellyintech` dans Netlify et activer la détection des formulaires dans **Forms** si nécessaire.
2. Déployer cette version du dépôt. Vérifier que le formulaire `contact` apparaît dans **Forms**.
3. Dans **Forms > Submission notifications > Add notification**, ajouter une notification **Email** pour le formulaire `contact` vers `telly.intech@gmail.com`.
4. Pour la recette, ajouter temporairement une seconde notification Email du même formulaire vers `souleymane9700@gmail.com`.
5. Depuis `/contact` du site déployé, envoyer un message clairement intitulé `[TEST] Formulaire Telly InTech`, sans données client. Utiliser une adresse de contact valide dans le champ email.
6. Vérifier la soumission dans Netlify, puis la réception dans les deux boîtes (y compris les indésirables). Le champ email du formulaire est l'adresse du visiteur, pas le destinataire des notifications.
7. Après validation, retirer la notification temporaire de test pour ne pas recevoir les demandes client sur la boîte personnelle.

Les destinataires ne sont pas configurables par le visiteur et aucun mot de passe Gmail n'est nécessaire dans le code. Les tests locaux Vite ne traitent pas les soumissions Netlify.

Documentation : https://docs.netlify.com/manage/forms/setup/ et https://docs.netlify.com/manage/forms/notifications/

## E-mail HTML Telly InTech avec Resend

Le modèle personnalisé est dans `server/email/contact-template.mjs`. Il contient une version HTML et texte, des libellés français et un bouton Répondre. Les contenus saisis sont échappés. Le champ Reply-To correspond au visiteur, tandis que l'expéditeur et les destinataires sont fixés côté serveur.

La fonction événementielle `netlify/functions/submission-created.mjs` se déclenche après la validation d'une soumission par Netlify. Ne pas créer de webhook public supplémentaire. Netlify vérifie la signature de ses événements. Le formulaire continue à enregistrer les messages dans Netlify Forms ; sa confirmation à l'écran ne garantit pas la réception d'un e-mail.

### Activation dans Netlify

1. Créer un compte Resend et vérifier un domaine que vous contrôlez pour l'expéditeur. Une adresse Gmail ne constitue pas un domaine d'expédition vérifié. Créer une clé API d'envoi.
2. Dans les variables d'environnement Netlify (portée **Functions**), renseigner :

| Variable | Valeur |
| --- | --- |
| `RESEND_API_KEY` | Clé privée Resend ; ne pas la mettre dans Git ni dans une variable `VITE_*` |
| `CONTACT_EMAIL_FROM` | `Telly InTech <contact@votre-domaine-verifie>` avec votre vraie adresse vérifiée |
| `CONTACT_EMAIL_TO` | `souleymane9700@gmail.com` pour le test ; puis `telly.intech@gmail.com` en production |
| `CONTACT_EMAIL_ENABLED` | `true` une fois la configuration prête ; absente ou `false` pour désactiver cet envoi |

3. Déployer **le dépôt avec ses fonctions**, via l'intégration Git Netlify ou Netlify CLI (`netlify deploy --build --prod` après liaison au bon projet). Déposer uniquement `dist` dans Netlify ne déploie pas cette fonction.
4. Vérifier la présence de `submission-created` dans **Functions**, puis soumettre un message `[TEST]` depuis le formulaire déployé.
5. Vérifier le journal d'envoi Resend et la réception dans la boîte de test. Une acceptation par l'API n'est pas une preuve de livraison. Les erreurs sont signalées dans les logs de la fonction sans contenu personnel. Les messages restent consultables dans Netlify Forms même en cas d'échec d'envoi. Les répétitions d'un même événement utilisent la même clé d'idempotence Resend (fenêtre de 24 h) ; aucune garantie de nouvelle tentative automatique n'est ajoutée.
6. Remplacer `CONTACT_EMAIL_TO` par `telly.intech@gmail.com`, redéployer et vérifier. Supprimer ensuite les anciennes notifications Email Netlify pour éviter les doubles messages. Les conserver pendant le test évite d'interrompre la réception existante.

### Aperçu et vérification locale

- `node scripts/preview-contact-email.mjs` génère `artifacts/contact-email-preview.html` avec des données fictives, sans envoi.
- `node --test tests/contact-email.test.mjs` vérifie le modèle, les destinataires fixes, les erreurs et les clés d'idempotence avec une API simulée.

Références : https://docs.netlify.com/build/functions/trigger-on-events/ et https://resend.com/docs/api-reference/emails/send-email
