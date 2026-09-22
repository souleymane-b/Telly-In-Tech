export type ProjectSector = 'finance' | 'public' | 'legal' | 'commerce';

export interface Project {
  id: number;
  title: string;
  client: string;
  url: string;
  brandImage: string;
  brandBackground: string;
  sector: ProjectSector;
  year: string;
  description: string;
  descriptionEn: string;
  tags: string[];
}

/** Real public references. Keep the short descriptions factual and link to the live product. */
export const projects: Project[] = [
  {
    id: 1,
    title: 'Al-Toppé',
    client: 'CERIP',
    url: 'https://www.altoppe.sn/',
    brandImage: '/projects/altoppe.png',
    brandBackground: '#eef3ec',
    sector: 'finance',
    year: '2026',
    description: 'Solution de traçabilité financière par reconnaissance vocale en wolof et en français, destinée aux micro-entreprises.',
    descriptionEn: 'A voice-based financial traceability solution in Wolof and French, designed for micro-businesses.',
    tags: ['Web app', 'Voice-to-data', 'SYSCOHADA'],
  },
  {
    id: 2,
    title: 'Consulat du Sénégal à Naples',
    client: 'Consulat du Sénégal à Naples',
    url: 'https://www.consulatsenegalnaples.it/fr',
    brandImage: '/projects/consulat.png',
    brandBackground: '#ffffff',
    sector: 'public',
    year: '2025',
    description: 'Portail d’information et de prise de rendez-vous pour les démarches consulaires de la diaspora sénégalaise en Italie.',
    descriptionEn: 'Information and appointment portal for consular procedures for the Senegalese diaspora in Italy.',
    tags: ['Site institutionnel', 'Rendez-vous', 'Multilingue'],
  },
  {
    id: 3,
    title: 'Wolof Sign',
    client: 'Wolof Digital',
    url: 'https://www.sign.wolofdigital.com/',
    brandImage: '/projects/wolof-sign.png',
    brandBackground: '#f0f8f3',
    sector: 'legal',
    year: '2026',
    description: 'Plateforme sénégalaise de signature électronique et de gestion documentaire, pensée pour un parcours de signature sécurisé.',
    descriptionEn: 'A Senegalese electronic-signature and document-management platform designed for a secure signing journey.',
    tags: ['SaaS', 'Signature électronique', 'Sécurité'],
  },
  {
    id: 4,
    title: 'JAAK+',
    client: 'JAAK+',
    url: 'https://jaakplus.com/',
    brandImage: '/projects/jaakplus.png',
    brandBackground: '#faf7ef',
    sector: 'commerce',
    year: '2025',
    description: 'Boutique en ligne sénégalaise consacrée à la mode, à la beauté et aux accessoires.',
    descriptionEn: 'A Senegalese online store for fashion, beauty and accessories.',
    tags: ['E-commerce', 'Mode & beauté', 'Catalogue'],
  },
];

export const sectorLabels: Record<ProjectSector, { fr: string; en: string }> = {
  finance: { fr: 'Finance', en: 'Finance' },
  public: { fr: 'Service public', en: 'Public service' },
  legal: { fr: 'Legaltech', en: 'Legal tech' },
  commerce: { fr: 'E-commerce', en: 'E-commerce' },
};
