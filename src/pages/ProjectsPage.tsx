import { useState, useEffect, useCallback } from 'react';
import { ArrowUpRight, X, Quote, TrendingUp, Target, Lightbulb, ClipboardList } from 'lucide-react';
import CTABanner from '@/components/home/CTABanner';
import { useLanguage } from '@/hooks/useLanguage';

type Category = 'web' | 'mobile' | 'marketing';
type Sector = 'commerce' | 'health' | 'ngo' | 'government' | 'food' | 'startup';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

interface Project {
  id: number;
  title: string;
  category: Category;
  sector: Sector;
  image: string;
  shortDescription: string;
  context: string;
  problem: string;
  solution: string;
  results: { label: string; value: string }[];
  tags: string[];
  year: string;
  client: string;
  testimonial?: Testimonial;
}

const sectorLabels: Record<Sector, { fr: string; en: string }> = {
  commerce: { fr: 'Commerce', en: 'Commerce' },
  health: { fr: 'Santé', en: 'Health' },
  ngo: { fr: 'ONG / Association', en: 'NGO / Association' },
  government: { fr: 'Gouvernement', en: 'Government' },
  food: { fr: 'Restauration', en: 'Food' },
  startup: { fr: 'Startup / Tech', en: 'Startup / Tech' },
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Plateforme E-commerce Guinée',
    category: 'web',
    sector: 'commerce',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    shortDescription: 'Marketplace en ligne pour artisans guinéens avec paiement mobile money intégré.',
    context: 'Les artisans guinéens disposent de produits de qualité mais n\'ont aucun canal de vente en ligne. Les marchés physiques restent leur seul point de vente, limitant leur clientèle au niveau local.',
    problem: 'Absence d\'infrastructures e-commerce adaptées au contexte guinéen, faible bancarisation et prédominance du paiement mobile money.',
    solution: 'Plateforme complète avec gestion des stocks, tableau de bord vendeur, intégration Orange Money / MTN Money et système de livraison intégré couvrant Conakry et les villes secondaires.',
    results: [
      { label: 'Vendeurs actifs', value: '+120' },
      { label: 'Commandes / mois', value: '1 500' },
      { label: 'Taux de conversion', value: '3,8%' },
    ],
    tags: ['React', 'Node.js', 'Mobile Money', 'PostgreSQL'],
    year: '2024',
    client: 'Artisanat Guinée',
    testimonial: {
      name: 'Aïssatou Diallo',
      role: 'Directrice, Artisanat Guinée',
      quote: 'Telly InTech a transformé notre façon de vendre. Nos artisans touchent désormais des clients dans tout le pays grâce au paiement mobile money.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
  },
  {
    id: 2,
    title: 'App Santé Communautaire',
    category: 'mobile',
    sector: 'health',
    image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
    shortDescription: 'Application mobile pour le suivi des consultations dans les centres de santé ruraux.',
    context: 'Les agents de santé communautaires en zones rurales n\'ont pas d\'outil digital pour suivre les patients. Les registres papier sont perdus ou incomplets.',
    problem: 'Connexion internet intermittente, faible équipement matériel et besoin critique de centraliser les données de santé publique.',
    solution: 'Application mobile fonctionnant hors-ligne avec synchronisation automatique. Suivi des patients, gestion des consultations et reporting vers le Ministère de la Santé.',
    results: [
      { label: 'Centres équipés', value: '47' },
      { label: 'Patients suivis', value: '12 000' },
      { label: 'Saisie gain de temps', value: '-65%' },
    ],
    tags: ['React Native', 'Firebase', 'Offline', 'Santé'],
    year: '2024',
    client: 'Ministère de la Santé',
    testimonial: {
      name: 'Dr. Mamadou Bah',
      role: 'Coordonnateur, Ministère de la Santé',
      quote: 'L\'application a révolutionné notre suivi sur le terrain. Le mode hors-ligne est un atout majeur pour nos agents en zone rurale.',
      avatar: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
  },
  {
    id: 3,
    title: 'Campagne Digitale ONG',
    category: 'marketing',
    sector: 'ngo',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    shortDescription: 'Stratégie de contenu et gestion des réseaux sociaux pour une ONG de développement.',
    context: 'Une ONG de défense des droits des femmes manquait de visibilité en ligne malgré des actions terrain impactantes.',
    problem: 'Faible présence digitale, contenu non structuré et absence de stratégie de communication cohérente.',
    solution: 'Stratégie digitale sur 6 mois : création de contenu, gestion Facebook / Instagram, campagnes publicitaires ciblées et reporting analytique mensuel.',
    results: [
      { label: 'Portée', value: '+300%' },
      { label: 'Abonnés', value: '+8 500' },
      { label: 'Engagement', value: '5,2%' },
    ],
    tags: ['Social Media', 'SEO', 'Content', 'Ads'],
    year: '2023',
    client: 'ONG Femme Active',
    testimonial: {
      name: 'Fatoumata Sow',
      role: 'Présidente, ONG Femme Active',
      quote: 'Notre message touche désormais des milliers de personnes. Telly InTech a su capturer l\'essence de notre mission.',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
  },
  {
    id: 4,
    title: 'Portail E-Gouvernance',
    category: 'web',
    sector: 'government',
    image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=800',
    shortDescription: 'Plateforme de services administratifs en ligne pour les citoyens guinéens.',
    context: 'Les démarches administratives exigeaient des déplacements physiques, avec des files d\'attente et des délais importants.',
    problem: 'Services éclatés, absence de portail unique et faible accessibilité numérique pour les citoyens.',
    solution: 'Portail citoyen unifié : demande de documents, suivi des dossiers, prise de rendez-vous. Interface intuitive et accessibilité numérique conforme aux standards WCAG.',
    results: [
      { label: 'Démarches en ligne', value: '32' },
      { label: 'Temps moyen', value: '-70%' },
      { label: 'Satisfaction', value: '92%' },
    ],
    tags: ['Vue.js', 'API REST', 'Sécurité', 'Accessibilité'],
    year: '2024',
    client: 'Ministère du Numérique',
    testimonial: {
      name: 'Cheikh Traoré',
      role: 'Directeur Numérique, Ministère du Numérique',
      quote: 'Un projet structurant pour la modernisation de l\'administration. La rigueur technique de Telly InTech a fait la différence.',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
  },
  {
    id: 5,
    title: 'App Livraison Conakry',
    category: 'mobile',
    sector: 'food',
    image: 'https://images.pexels.com/photos/4498136/pexels-photo-4498136.jpeg?auto=compress&cs=tinysrgb&w=800',
    shortDescription: 'Application de livraison de repas avec géolocalisation et paiement intégré.',
    context: 'Le marché de la livraison de repas à Conakry était dominé par des solutions non adaptées aux réalités locales.',
    problem: 'Connexions 3G instables, adresses non standardisées et besoin d\'intégrer le paiement mobile money.',
    solution: 'Application Flutter avec géolocalisation des restaurants, suivi temps réel des livreurs, paiement mobile money et notifications push. Interface optimisée pour les connexions faibles.',
    results: [
      { label: 'Restaurants partenaires', value: '85' },
      { label: 'Commandes / jour', value: '600' },
      { label: 'Note moyenne', value: '4,7/5' },
    ],
    tags: ['Flutter', 'Maps API', 'Stripe', 'Push'],
    year: '2024',
    client: 'Conakry Foods',
    testimonial: {
      name: 'Ibrahima Camara',
      role: 'CEO, Conakry Foods',
      quote: 'L\'app est rapide même en 3G. C\'est exactement ce dont le marché guinéen avait besoin.',
      avatar: 'https://images.pexels.com/photos/7640949/pexels-photo-7640949.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
  },
  {
    id: 6,
    title: 'Branding Startup Tech',
    category: 'marketing',
    sector: 'startup',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    shortDescription: 'Identité visuelle et stratégie de lancement pour une startup technologique.',
    context: 'JumbaPay, jeune startup fintech, avait besoin d\'une identité forte pour se démarquer sur un marché concurrentiel.',
    problem: 'Absence d\'identité de marque claire et de stratégie de lancement structurée.',
    solution: 'Identité visuelle complète : logo, charte graphique, site web, supports de communication et stratégie de lancement sur les réseaux sociaux avec storytelling.',
    results: [
      { label: 'Leads générés', value: '+450' },
      { label: 'Notoriété de marque', value: '+180%' },
      { label: 'Signups / mois', value: '2 300' },
    ],
    tags: ['Branding', 'Strategy', 'Design', 'Launch'],
    year: '2023',
    client: 'JumbaPay',
    testimonial: {
      name: 'Ousmane Sylla',
      role: 'Fondateur, JumbaPay',
      quote: 'Telly InTech a su donner une âme à notre marque. Le lancement a dépassé toutes nos attentes.',
      avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
  },
];

export default function ProjectsPage() {
  const { t, lang: language } = useLanguage();
  const [categoryFilter, setCategoryFilter] = useState<'all' | Category>('all');
  const [sectorFilter, setSectorFilter] = useState<'all' | Sector>('all');
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = projects.filter(p =>
    (categoryFilter === 'all' || p.category === categoryFilter) &&
    (sectorFilter === 'all' || p.sector === sectorFilter)
  );

  const categoryFilters = [
    { key: 'all', label: t.projects.all },
    { key: 'web', label: t.projects.web },
    { key: 'mobile', label: t.projects.mobile },
    { key: 'marketing', label: t.projects.marketing },
  ] as const;

  const sectorFilters: { key: 'all' | Sector; label: string }[] = [
    { key: 'all', label: t.projects.allSectors },
    ...Object.entries(sectorLabels).map(([key, val]) => ({
      key: key as Sector,
      label: language === 'fr' ? val.fr : val.en,
    })),
  ];

  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selected, close]);

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
      <section className="py-20 md:py-28 bg-white dark:bg-navy-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-10 space-y-4">
            <div>
              <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-3 text-center">
                {t.projects.filterByType}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {categoryFilters.map(f => (
                  <button
                    key={f.key}
                    onClick={() => setCategoryFilter(f.key)}
                    className={`font-inter font-medium text-sm px-5 py-2 rounded-full transition-all duration-300
                      ${categoryFilter === f.key
                        ? 'bg-navy text-white dark:bg-brand-orange shadow-brand'
                        : 'bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-navy-600'
                      }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-3 text-center">
                {t.projects.filterBySector}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {sectorFilters.map(f => (
                  <button
                    key={f.key}
                    onClick={() => setSectorFilter(f.key)}
                    className={`font-inter text-xs font-medium px-4 py-1.5 rounded-lg transition-all duration-300
                      ${sectorFilter === f.key
                        ? 'bg-electric-600 text-white shadow-md'
                        : 'bg-gray-50 dark:bg-navy-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-navy-700 border border-gray-200 dark:border-navy-700'
                      }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <p className="text-center font-inter text-gray-400 dark:text-gray-500 py-20">
              {t.projects.noResults}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((project, i) => (
                <article
                  key={project.id}
                  onClick={() => setSelected(project)}
                  className="group bg-gray-50 dark:bg-navy-800
                    rounded-2xl overflow-hidden border border-gray-100 dark:border-navy-700
                    hover:shadow-brand-lg transition-all duration-500 hover:-translate-y-1
                    cursor-pointer animate-fade-up"
                  style={{ animationDelay: `${(i % 3) * 100}ms` }}
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-brand-orange text-white text-xs font-inter font-medium px-3 py-1 rounded-full">
                        {t.projects[project.category]}
                      </span>
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-inter font-medium px-3 py-1 rounded-full">
                        {language === 'fr' ? sectorLabels[project.sector].fr : sectorLabels[project.sector].en}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="font-inter text-xs text-white/70 mb-1">{project.year} · {project.client}</p>
                      <h3 className="font-poppins font-bold text-lg text-white">{project.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="font-inter text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
                      {project.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="font-inter text-xs bg-gray-100 dark:bg-navy-700
                          text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 font-inter font-medium text-sm
                      text-brand-orange group-hover:gap-2.5 transition-all">
                      {t.projects.view}
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={close}
        >
          <div className="absolute inset-0 bg-navy/80 backdrop-blur-sm animate-fade-in" />
          <div
            className="relative bg-white dark:bg-navy-800 rounded-2xl shadow-2xl
              w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            {/* Hero image */}
            <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-2xl">
              <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
              <button
                onClick={close}
                aria-label={t.projects.close}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm
                  text-white p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex gap-2 mb-2">
                  <span className="bg-brand-orange text-white text-xs font-inter font-medium px-3 py-1 rounded-full">
                    {t.projects[selected.category]}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-inter font-medium px-3 py-1 rounded-full">
                    {language === 'fr' ? sectorLabels[selected.sector].fr : sectorLabels[selected.sector].en}
                  </span>
                </div>
                <p className="font-inter text-xs text-white/70 mb-1">{selected.year} · {selected.client}</p>
                <h2 className="font-poppins font-bold text-2xl text-white">{selected.title}</h2>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Context */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-electric-100 dark:bg-electric-900/30 flex items-center justify-center text-electric-600 dark:text-electric-400">
                  <ClipboardList size={20} />
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-navy dark:text-white mb-1">{t.projects.context}</h3>
                  <p className="font-inter text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{selected.context}</p>
                </div>
              </div>

              {/* Problem */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                  <Target size={20} />
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-navy dark:text-white mb-1">{t.projects.problem}</h3>
                  <p className="font-inter text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{selected.problem}</p>
                </div>
              </div>

              {/* Solution */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Lightbulb size={20} />
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-navy dark:text-white mb-1">{t.projects.solution}</h3>
                  <p className="font-inter text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{selected.solution}</p>
                </div>
              </div>

              {/* Results */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={20} className="text-brand-orange" />
                  <h3 className="font-poppins font-semibold text-navy dark:text-white">{t.projects.results}</h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {selected.results.map(r => (
                    <div key={r.label} className="text-center bg-gray-50 dark:bg-navy-700 rounded-xl p-4">
                      <p className="font-poppins font-bold text-2xl text-brand-orange mb-1">{r.value}</p>
                      <p className="font-inter text-xs text-gray-500 dark:text-gray-400">{r.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {selected.tags.map(tag => (
                  <span key={tag} className="font-inter text-xs bg-gray-100 dark:bg-navy-700
                    text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Testimonial */}
              {selected.testimonial && (
                <div className="bg-electric-50 dark:bg-navy-700 rounded-xl p-6 border-l-4 border-electric-500">
                  <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-electric-600 dark:text-electric-400 mb-3">
                    {t.projects.testimonial}
                  </p>
                  <Quote className="text-electric-300 dark:text-electric-700 mb-2" size={28} />
                  <p className="font-inter text-sm text-gray-700 dark:text-gray-200 italic leading-relaxed mb-4">
                    « {selected.testimonial.quote} »
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={selected.testimonial.avatar}
                      alt={selected.testimonial.name}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-poppins font-semibold text-sm text-navy dark:text-white">{selected.testimonial.name}</p>
                      <p className="font-inter text-xs text-gray-500 dark:text-gray-400">{selected.testimonial.role}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <CTABanner />
    </>
  );
}
