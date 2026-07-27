/*
# Création de la table contact_submissions pour Telly InTech

1. Nouvelle table
- `contact_submissions`
  - `id` (uuid, clé primaire)
  - `name` (text, nom complet)
  - `company` (text, entreprise)
  - `email` (text, email de contact)
  - `phone` (text, téléphone)
  - `service` (text, service souhaité)
  - `message` (text, message)
  - `created_at` (timestamp, date de soumission)

2. Sécurité
- RLS activé
- Insertion publique (anon) autorisée (formulaire de contact public)
- Lecture restreinte (admin uniquement via service role)
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text,
  email text NOT NULL,
  phone text,
  service text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact" ON contact_submissions;
CREATE POLICY "anon_insert_contact" ON contact_submissions FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_contact" ON contact_submissions;
CREATE POLICY "anon_select_contact" ON contact_submissions FOR SELECT
TO anon, authenticated USING (false);
