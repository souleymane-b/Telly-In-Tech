# Assistant IA Telly InTech

Le widget appelle `/.netlify/functions/chat`, qui appelle l'API Google Gemini generateContent. Il n'envoie plus de réponses aléatoires. Le statut « Assistant IA » ne prétend pas qu'un conseiller humain est connecté.

## Activation

Dans Netlify → Project configuration → Environment variables, ajouter `GEMINI_API_KEY` avec une clé créée dans Google AI Studio (portée Functions, valeur secrète). Ne jamais utiliser `VITE_GEMINI_API_KEY`, committer la clé ou la partager dans une conversation.

Le modèle par défaut est `gemini-3.5-flash-lite`. On peut définir `GEMINI_CHAT_MODEL` pour utiliser un autre modèle compatible generateContent, accessible au compte. La clé doit avoir accès au modèle et disposer de quota disponible. La clé Resend ne convient pas.

Redéployer le dépôt complet, fonctions comprises, via Netlify Git ou CLI. Un simple dépôt de `dist` ne déploie pas les fonctions. Vérifier que `chat` apparaît dans Functions et que la règle de limitation est reconnue dans le journal de déploiement. `CHAT_ENABLED=false` coupe l'IA ; une clé absente donne également une indisponibilité explicite.

## Comportement et limites

- Le modèle reçoit les services, les quatre références et les coordonnées publiques. Aucun accès aux données clients ni outil d'envoi/réservation. Les demandes de devis passent par `/contact`.
- Les messages sont rendus en texte React, sans interprétation HTML. En cas d'erreur, le brouillon est conservé et un lien de contact est proposé.
- Historique en mémoire uniquement, limité aux échanges récents transmis ; fermeture du widget sans effacement, rechargement de la page avec effacement. Le texte affiché informe le visiteur que ses messages sont envoyés à Google Gemini.
- `store:false` désactive la journalisation facultative de la requête Gemini ; cela ne constitue pas une garantie d'absence de toute rétention par le fournisseur. Ne pas saisir de données sensibles.
- Limites : 1 500 caractères par message, 12 messages par requête, réponse plafonnée à 1 024 tokens, délai serveur de 20 secondes. Netlify limite à 8 requêtes/minute par IP et domaine. Cela ne constitue pas un plafond de dépenses global et l'application des règles doit être vérifiée au déploiement. Surveiller l'usage du projet Google AI Studio.
- Les consignes réduisent les inventions mais ne garantissent pas toutes les réponses : aucun tarif ou engagement commercial ne doit être confirmé sans l'équipe.

## Validation

`node --test tests/chat.test.mjs` teste les requêtes, erreurs et réponses avec une API simulée. `vite` seul ne sert pas les fonctions ; utiliser Netlify Dev ou un déploiement de test pour un échange réel.

Recette : poser une question sur les services, demander un tarif précis (orientation vers devis), demander « avez-vous envoyé mon message ? » (aucune fausse confirmation), changer de langue, vérifier le contact et la restauration du brouillon en cas d'erreur.

Sources : https://ai.google.dev/api/generate-content et https://docs.netlify.com/manage/security/secure-access-to-sites/rate-limiting/

La valeur GEMINI_API_KEY doit être la clé secrète, pas l’URL de la page AI Studio. Les anciennes variables OPENAI_API_KEY et OPENAI_CHAT_MODEL ne sont plus utilisées.
