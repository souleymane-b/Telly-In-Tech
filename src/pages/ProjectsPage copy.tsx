import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import CTABanner from '@/components/home/CTABanner';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Project {
  id: number;
  title: string;
  category: 'web' | 'mobile' | 'marketing';
  image: string;
  description: string;
  longDescription: string;
  tags: string[];
  year: string;
  client: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Plateforme E-commerce Guinée',
    category: 'web',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Marketplace en ligne pour artisans guinéens avec paiement mobile money intégré.',
    longDescription: 'Une plateforme complète permettant aux artisans guinéens de vendre leurs produits en ligne avec intégration du paiement mobile money (Orange Money, MTN Money). Gestion des stocks, tableau de bord vendeur et système de livraison intégrés.',
    tags: ['React', 'Node.js', 'Mobile Money', 'PostgreSQL'],
    year: '2024',
    client: 'Artisanat Guinée',
  },
  {
    id: 2,
    title: 'App Santé Communautaire',
    category: 'mobile',
    image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Application mobile pour le suivi des consultations dans les centres de santé ruraux.',
    longDescription: 'Application mobile fonctionnant hors-ligne pour les agents de santé communautaires en zones rurales. Suivi des patients, gestion des consultations et synchronisation automatique lorsque la connexion est disponible.',
    tags: ['React Native', 'Firebase', 'Offline', 'Santé'],
    year: '2024',
    client: 'Ministère de la Santé',
  },
  {
    id: 3,
    title: 'Campagne Digitale ONG',
    category: 'marketing',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Stratégie de contenu et gestion des réseaux sociaux pour une ONG de développement.',
    longDescription: 'Stratégie digitale complète sur 6 mois : création de contenu, gestion des réseaux sociaux (Facebook, Instagram), campagnes publicitaires ciblées et reporting analytique. Augmentation de la portée de 300%.',
    tags: ['Social Media', 'SEO', 'Content', 'Ads'],
    year: '2023',
    client: 'ONG Femme Active',
  },
  {
    id: 4,
    title: 'Portail E-Gouvernance',
    category: 'web',
    image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Plateforme de services administratifs en ligne pour les citoyens guinéens.',
    longDescription: 'Portail citoyen permettant d\'accéder aux services administratifs en ligne : demande de documents, suivi des dossiers, prise de rendez-vous. Interface intuitive et accessibilité numérique au cœur du projet.',
    tags: ['Vue.js', 'API REST', 'Sécurité', 'Accessibilité'],
    year: '2024',
    client: 'Ministère du Numérique',
  },
  {
    id: 5,
    title: 'App Livraison Conakry',
    category: 'mobile',
    image: 'https://images.pexels.com/photos/4498136/pexels-photo-4498136.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Application de livraison de repas avec géolocalisation et paiement intégré.',
    longDescription: 'Application de food delivery adaptée à Conakry : géolocalisation des restaurants, suivi en temps réel des livreurs, paiement mobile money et notifications push. Interface optimisée pour les connexions 3G.',
    tags: ['Flutter', 'Maps API', 'Stripe', 'Push'],
    year: '2024',
    client: 'Conakry Foods',
  },
  {
    id: 6,
    title: 'Branding Startup Tech',
    category: 'marketing',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Identité visuelle et stratégie de lancement pour une startup technologique.',
    longDescription: 'Création d\'identité visuelle complète : logo, charte graphique, site web, supports de communication et stratégie de lancement sur les réseaux sociaux. Positionnement de marque et storytelling.',
    tags: ['Branding', 'Strategy', 'Design', 'Launch'],
    year: '2023',
    client: 'JumbaPay',
  },
];

export default function ProjectsPage() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'marketing'>('all');

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  const filters = [
    { key: 'all', label: t.projects.all },
    { key: 'web', label: t.projects.web },
    { key: 'mobile', label: t.projects.mobile },
    { key: 'marketing', label: t.projects.marketing },
  ] as const;

  return (
    <>
      {/* Header */}
      <section className="relative pt-32 pb-16 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-700 to-electric-700 opacity-95" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-brand-orange mb-3">
            {t.projects.subtitle}
          </p>
          <h1 className="font-poppins font-black text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            {t.projects.title}
          </h1>
          <p className="font-inter text-base md:text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            {t.projects.description}
          </p>
        </div>
      </section>

      {/* Projects grid */}
      <section ref={sectionRef as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-white dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-on-scroll">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`font-inter font-medium text-sm px-5 py-2 rounded-full transition-all duration-300
                  ${filter === f.key
                    ? 'bg-navy text-white dark:bg-brand-orange shadow-brand'
                    : 'bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-navy-600'
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project, i) => (
              <article
                key={project.id}
                className={`animate-on-scroll delay-${(i % 3) * 100} group bg-gray-50 dark:bg-navy-800
                  rounded-2xl overflow-hidden border border-gray-100 dark:border-navy-700
                  hover:shadow-brand-lg transition-all duration-500 hover:-translate-y-1`}
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
                  <span className="absolute top-3 left-3 bg-brand-orange text-white text-xs
                    font-inter font-medium px-3 py-1 rounded-full">
                    {t.projects[project.category]}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-inter text-xs text-white/70 mb-1">{project.year} · {project.client}</p>
                    <h3 className="font-poppins font-bold text-lg text-white">{project.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="font-inter text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                    {project.longDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="font-inter text-xs bg-gray-100 dark:bg-navy-700
                        text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="inline-flex items-center gap-1.5 font-inter font-medium text-sm
                    text-brand-orange hover:gap-2.5 transition-all">
                    {t.projects.view}
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
