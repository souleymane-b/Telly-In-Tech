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
