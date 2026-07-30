import { useEffect, useState } from 'react';
import { ArrowUpRight, X, Quote, CheckCircle2, Layers } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import CTABanner from '@/components/home/CTABanner';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface Project {
  id: number;
  title: string;
  category: 'web' | 'mobile' | 'marketing';
  sector: string;
  image: string;
  description: string;
  longDescription: string;
  tags: string[];
  year: string;
  client: string;
  context: string;
  problem: string;
  solution: string;
  results: string[];
  testimonial: Testimonial;
}

const projects: Project[] = [
  // ... (Votre tableau de données reste inchangé, assurez-vous qu'il est bien présent)
  {
    id: 1,
    title: 'Plateforme E-commerce Guinée',
    category: 'web',
    sector: 'Commerce & Artisanat',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Marketplace en ligne pour artisans guinéens avec paiement mobile money intégré.',
    longDescription: 'Une plateforme complète permettant aux artisans guinéens de vendre leurs produits en ligne avec intégration du paiement mobile money (Orange Money, MTN Money). Gestion des stocks, tableau de bord vendeur et système de livraison intégrés.',
    tags: ['React', 'Node.js', 'Mobile Money', 'PostgreSQL'],
    year: '2024',
    client: 'Artisanat Guinée',
    context: "Un collectif d'artisans guinéens vendait exclusivement sur les marchés physiques de Conakry, sans aucune présence en ligne.",
    problem: "Les acheteurs de la diaspora et des grandes villes n'avaient aucun moyen simple de découvrir et d'acheter ces produits, et les artisans ne disposaient d'aucun outil pour gérer leurs stocks à distance.",
    solution: "Conception d'une marketplace dédiée avec fiche vendeur, gestion des stocks en temps réel et paiement mobile money natif (Orange Money, MTN Money) pour coller aux usages locaux.",
    results: [
      "+120 artisans actifs sur la plateforme en 6 mois",
      "35% des transactions réglées en mobile money dès le 1er trimestre",
      "Mise en ligne d'un produit ramenée à moins de 3 minutes",
    ],
    testimonial: {
      quote: "La plateforme a changé notre façon de vendre : nos artisans touchent aujourd'hui des clients qu'ils n'auraient jamais rencontrés au marché.",
      author: 'Fatoumata Camara',
      role: 'Coordinatrice, Artisanat Guinée',
    },
  },
  {
    id: 2,
    title: 'App Santé Communautaire',
    category: 'mobile',
    sector: 'Santé',
    image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Application mobile pour le suivi des consultations dans les centres de santé ruraux.',
    longDescription: 'Application mobile fonctionnant hors-ligne pour les agents de santé communautaires en zones rurales. Suivi des patients, gestion des consultations et synchronisation automatique lorsque la connexion est disponible.',
    tags: ['React Native', 'Firebase', 'Offline', 'Santé'],
    year: '2024',
    client: 'Ministère de la Santé',
    context: "Dans plusieurs préfectures rurales, le suivi des consultations reposait encore sur des registres papier difficiles à centraliser.",
    problem: "Sans connexion internet fiable, les agents de santé ne pouvaient ni consulter l'historique d'un patient ni faire remonter leurs données au niveau régional en temps utile.",
    solution: "Développement d'une application mobile fonctionnant intégralement hors-ligne, avec synchronisation automatique des dossiers dès qu'une connexion redevient disponible.",
    results: [
      "48 centres de santé équipés la première année",
      "Temps de saisie d'une consultation réduit de moitié",
      "Délai de remontée des données régionales passé de plusieurs semaines à 48h",
    ],
    testimonial: {
      quote: "Même sans réseau, nos agents continuent de travailler normalement. Les données remontent dès qu'une connexion est disponible, sans effort supplémentaire.",
      author: 'Dr. Ibrahima Sory Bah',
      role: 'Coordinateur régional de santé',
    },
  },
  {
    id: 3,
    title: 'Campagne Digitale ONG',
    category: 'marketing',
    sector: 'ONG & Développement',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Stratégie de contenu et gestion des réseaux sociaux pour une ONG de développement.',
    longDescription: 'Stratégie digitale complète sur 6 mois : création de contenu, gestion des réseaux sociaux (Facebook, Instagram), campagnes publicitaires ciblées et reporting analytique. Augmentation de la portée de 300%.',
    tags: ['Social Media', 'SEO', 'Content', 'Ads'],
    year: '2023',
    client: 'ONG Femme Active',
    context: "L'ONG menait des actions de terrain reconnues, mais restait quasiment invisible sur les réseaux sociaux, avec une audience très restreinte.",
    problem: "Sans visibilité digitale, l'ONG peinait à mobiliser de nouveaux donateurs et bénévoles au-delà de son réseau historique.",
    solution: "Mise en place d'une ligne éditoriale dédiée, calendrier de publication régulier et campagnes publicitaires ciblées sur Facebook et Instagram, avec reporting mensuel.",
    results: [
      "Portée mensuelle multipliée par 3 en 6 mois",
      "+80 nouveaux bénévoles inscrits via les réseaux sociaux",
      "Taux d'engagement moyen supérieur à 6% sur Instagram",
    ],
    testimonial: {
      quote: "Nous recevons désormais des messages de soutien venus de toute la sous-région. Notre travail de terrain est enfin visible en ligne.",
      author: 'Mariam Diakité',
      role: 'Directrice, ONG Femme Active',
    },
  },
  {
    id: 4,
    title: 'Portail E-Gouvernance',
    category: 'web',
    sector: 'Secteur public',
    image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Plateforme de services administratifs en ligne pour les citoyens guinéens.',
    longDescription: "Portail citoyen permettant d'accéder aux services administratifs en ligne : demande de documents, suivi des dossiers, prise de rendez-vous. Interface intuitive et accessibilité numérique au cœur du projet.",
    tags: ['Vue.js', 'API REST', 'Sécurité', 'Accessibilité'],
    year: '2024',
    client: 'Ministère du Numérique',
    context: "L'obtention d'un document administratif imposait généralement plusieurs déplacements physiques et de longues files d'attente.",
    problem: "Les citoyens n'avaient aucune visibilité sur l'état de leur dossier et devaient se déplacer uniquement pour vérifier une information.",
    solution: "Création d'un portail citoyen sécurisé permettant de déposer une demande, suivre son dossier en ligne et prendre rendez-vous, pensé pour rester accessible même aux usagers peu familiers du numérique.",
    results: [
      "60% des demandes de documents déposées en ligne dès la 1ère année",
      "Temps d'attente moyen en guichet réduit de 40%",
      "Portail conforme aux standards d'accessibilité numérique",
    ],
    testimonial: {
      quote: "Les citoyens peuvent enfin suivre leur dossier depuis leur téléphone, sans avoir à se déplacer juste pour prendre des nouvelles.",
      author: 'Mamadou Alpha Sow',
      role: 'Chef de projet, Ministère du Numérique',
    },
  },
  {
    id: 5,
    title: 'App Livraison Conakry',
    category: 'mobile',
    sector: 'Restauration',
    image: 'https://images.pexels.com/photos/4498136/pexels-photo-4498136.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Application de livraison de repas avec géolocalisation et paiement intégré.',
    longDescription: 'Application de food delivery adaptée à Conakry : géolocalisation des restaurants, suivi en temps réel des livreurs, paiement mobile money et notifications push. Interface optimisée pour les connexions 3G.',
    tags: ['Flutter', 'Maps API', 'Stripe', 'Push'],
    year: '2024',
    client: 'Conakry Foods',
    context: "Conakry Foods opérait un réseau de restaurants partenaires mais ne proposait aucune solution de livraison digitale.",
    problem: "Les commandes se faisaient uniquement par téléphone, sans suivi en temps réel, et les erreurs d'adresse ralentissaient fréquemment les livraisons.",
    solution: "Application mobile de livraison avec géolocalisation précise des restaurants et des livreurs, paiement mobile money intégré et interface allégée pour rester fluide sur les connexions 3G.",
    results: [
      "Temps de livraison moyen réduit de 25%",
      "+15 000 commandes traitées la première année",
      "Taux d'erreur de livraison divisé par 4",
    ],
    testimonial: {
      quote: "Nos clients suivent leur livreur en direct et nous avons divisé les appels au service client par deux depuis le lancement.",
      author: 'Sékou Fofana',
      role: 'Directeur opérations, Conakry Foods',
    },
  },
  {
    id: 6,
    title: 'Branding Startup Tech',
    category: 'marketing',
    sector: 'Technologie',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Identité visuelle et stratégie de lancement pour une startup technologique.',
    longDescription: "Création d'identité visuelle complète : logo, charte graphique, site web, supports de communication et stratégie de lancement sur les réseaux sociaux. Positionnement de marque et storytelling.",
    tags: ['Branding', 'Strategy', 'Design', 'Launch'],
    year: '2023',
    client: 'JumbaPay',
    context: "JumbaPay s'apprêtait à lancer sa solution de paiement mais n'avait encore aucune identité de marque ni présence en ligne.",
    problem: "Sans positionnement clair ni identité visuelle, la startup risquait de se lancer sans se différencier auprès d'investisseurs et d'utilisateurs déjà sollicités par la concurrence.",
    solution: "Définition du positionnement de marque, création du logo et de la charte graphique, refonte du site web et plan de lancement coordonné sur les réseaux sociaux.",
    results: [
      "Lancement couvert par 5 médias locaux",
      "+10 000 impressions sur la campagne de lancement en 2 semaines",
      "Identité de marque déployée sur l'ensemble des supports en 6 semaines",
    ],
    testimonial: {
      quote: "Notre lancement a eu l'impact d'une marque déjà établie. L'identité créée nous sert encore aujourd'hui de socle pour toute notre communication.",
      author: 'Aïssatou Barry',
      role: 'Co-fondatrice, JumbaPay',
    },
  },
];

const categoryAccent: Record<Project['category'], { badge: string; ring: string }> = {
  web: { badge: 'bg-electric-500', ring: 'group-hover:ring-electric-500/40' },
  mobile: { badge: 'bg-brand-orange', ring: 'group-hover:ring-brand-orange/40' },
  marketing: { badge: 'bg-navy', ring: 'group-hover:ring-navy/30' },
};

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  const accent = categoryAccent[project.category];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/70 backdrop-blur-sm overflow-y-auto"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()} // ✅ Fix : Ne se ferme que si on clique exactement sur le fond sombre
    >
      <div
        className="relative bg-white dark:bg-navy-800 rounded-3xl w-full max-w-2xl md:max-w-3xl max-h-[90vh] shadow-2xl overflow-y-auto my-auto"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50
            text-white flex items-center justify-center transition-colors"
        >
          <X size={18} />
        </button>

        <div className="relative h-52 md:h-72 overflow-hidden rounded-t-3xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className={`${accent.badge} text-white text-xs font-inter font-medium px-3 py-1 rounded-full`}>
              {project.category === 'web' ? 'Web' : project.category === 'mobile' ? 'Mobile' : 'Marketing'}
            </span>
            <span className="text-xs font-inter font-medium px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/10">
              {project.sector}
            </span>
          </div>
          <div className="absolute bottom-5 left-6 right-6">
            <p className="font-inter text-xs text-white/70 mb-1">{project.year} · {project.client}</p>
            <h3 className="font-poppins font-bold text-2xl md:text-3xl text-white">{project.title}</h3>
          </div>
        </div>

        <div className="p-5 md:p-8 space-y-6 md:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-mono text-[11px] tracking-widest uppercase text-gray-400 mb-2">Contexte</p>
              <p className="font-inter text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{project.context}</p>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-widest uppercase text-gray-400 mb-2">Problématique</p>
              <p className="font-inter text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{project.problem}</p>
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-widest uppercase text-brand-orange mb-2">Solution apportée</p>
            <p className="font-inter text-sm text-gray-700 dark:text-gray-200 leading-relaxed">{project.solution}</p>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-widest uppercase text-gray-400 mb-3">Résultats mesurables</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.results.map((r, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 bg-gray-50 dark:bg-navy-700 rounded-xl p-3.5
                    border border-gray-100 dark:border-navy-600"
                >
                  <CheckCircle2 size={16} className="text-brand-orange mt-0.5 shrink-0" />
                  <span className="font-inter text-sm text-gray-700 dark:text-gray-200">{r}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative bg-gray-50 dark:bg-navy-700 rounded-2xl p-6 border border-gray-100 dark:border-navy-600">
            <Quote className="text-brand-orange/30 mb-3" size={28} strokeWidth={1.5} />
            <p className="font-inter text-base text-navy dark:text-white leading-relaxed mb-4 italic">
              "{project.testimonial.quote}"
            </p>
            <p className="font-inter text-sm font-semibold text-navy dark:text-white">
              {project.testimonial.author}
            </p>
            <p className="font-inter text-xs text-gray-500 dark:text-gray-400">{project.testimonial.role}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="font-inter text-xs bg-gray-100 dark:bg-navy-700
                text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-md">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'marketing'>('all');
  const [sectorFilter, setSectorFilter] = useState<string>('all');
  const [selected, setSelected] = useState<Project | null>(null);

  const sectors = Array.from(new Set(projects.map(p => p.sector)));

  const filtered = projects.filter(
    p => (filter === 'all' || p.category === filter) && (sectorFilter === 'all' || p.sector === sectorFilter)
  );

  const filters = [
    { key: 'all', label: t.projects.all },
    { key: 'web', label: t.projects.web },
    { key: 'mobile', label: t.projects.mobile },
    { key: 'marketing', label: t.projects.marketing },
  ] as const;

  const countFor = (key: typeof filters[number]['key']) =>
    (key === 'all' ? projects : projects.filter(p => p.category === key))
      .filter(p => sectorFilter === 'all' || p.sector === sectorFilter).length;

  const sectorCountFor = (sector: string) =>
    (sector === 'all' ? projects : projects.filter(p => p.sector === sector))
      .filter(p => filter === 'all' || p.category === filter).length;

  const handleCategoryClick = (key: typeof filters[number]['key']) => {
    setFilter(key);
    if (sectorFilter !== 'all') {
      const stillValid = projects.some(p => p.sector === sectorFilter && (key === 'all' || p.category === key));
      if (!stillValid) setSectorFilter('all');
    }
  };

  const handleSectorClick = (sector: string) => {
    setSectorFilter(sector);
    if (filter !== 'all' && sector !== 'all') {
      const stillValid = projects.some(p => p.category === filter && p.sector === sector);
      if (!stillValid) setFilter('all');
    }
  };

  return (
    <>
      {/* Header */}
      <section className="relative pt-32 pb-20 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-700 to-electric-700 opacity-95" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-orange/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-electric-500/20 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-brand-orange mb-3">
            {t.projects.subtitle}
          </p>
          <h1 className="font-poppins font-black text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            {t.projects.title}
          </h1>
          <p className="font-inter text-base md:text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed mb-8">
            {t.projects.description}
          </p>
          <div className="flex items-center justify-center gap-2 font-mono text-xs text-white/40 tracking-widest uppercase">
            <span>{String(projects.length).padStart(2, '0')} dossiers</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>Guinée & au-delà</span>
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section ref={sectionRef as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-white dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-14 animate-on-scroll">
            <p className="text-center font-mono text-[11px] tracking-widest uppercase text-gray-400 mb-3">
              Type de service
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {filters.map(f => {
                const count = countFor(f.key);
                // ✅ Fix #1 : Ne désactive JAMAIS le bouton actif, même si son compteur est à 0
                const isActive = filter === f.key;
                const disabled = f.key !== 'all' && count === 0 && !isActive;
                return (
                  <button
                    key={f.key}
                    onClick={() => handleCategoryClick(f.key)}
                    disabled={disabled}
                    className={`font-inter font-medium text-sm pl-5 pr-4 py-2 rounded-full transition-all duration-300
                      inline-flex items-center gap-2
                      ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
                      ${isActive
                        ? 'bg-navy text-white dark:bg-brand-orange shadow-brand'
                        : 'bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-navy-600'
                      }`}
                  >
                    {f.label}
                    <span
                      className={`font-mono text-[11px] px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20' : 'bg-white dark:bg-navy-800 text-gray-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="text-center font-mono text-[11px] tracking-widest uppercase text-gray-400 mb-3 flex items-center justify-center gap-1.5">
              <Layers size={12} /> Secteur d'activité
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => handleSectorClick('all')}
                className={`font-inter text-xs px-4 py-1.5 rounded-full border transition-all duration-300
                  ${sectorFilter === 'all'
                    ? 'border-brand-orange text-brand-orange bg-brand-orange/5'
                    : 'border-gray-200 dark:border-navy-600 text-gray-500 dark:text-gray-400 hover:border-gray-300'
                  }`}
              >
                Tous secteurs
              </button>
              {sectors.map(sector => {
                const count = sectorCountFor(sector);
                // ✅ Fix #2 : Ne désactive JAMAIS le bouton actif, même si son compteur est à 0
                const isActive = sectorFilter === sector;
                const disabled = sector !== 'all' && count === 0 && !isActive;
                return (
                  <button
                    key={sector}
                    onClick={() => handleSectorClick(sector)}
                    disabled={disabled}
                    className={`font-inter text-xs px-4 py-1.5 rounded-full border transition-all duration-300
                      ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
                      ${isActive
                        ? 'border-brand-orange text-brand-orange bg-brand-orange/5'
                        : 'border-gray-200 dark:border-navy-600 text-gray-500 dark:text-gray-400 hover:border-gray-300'
                      }`}
                  >
                    {sector}
                  </button>
                );
              })}
            </div>
          </div>

          {filtered.length === 0 && (
            <p className="text-center font-inter text-sm text-gray-400 py-16">
              Aucun projet ne correspond à cette combinaison de filtres.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project, i) => {
              const accent = categoryAccent[project.category];
              return (
                <article
                  key={project.id}
                  className={`animate-on-scroll delay-${(i % 3) * 100} group relative bg-gray-50 dark:bg-navy-800
                    rounded-3xl overflow-hidden border border-gray-100 dark:border-navy-700
                    ring-1 ring-transparent ${accent.ring}
                    hover:shadow-brand-lg transition-all duration-500 hover:-translate-y-1.5`}
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/30 to-transparent" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className={`${accent.badge} text-white text-xs font-inter font-medium px-3 py-1 rounded-full`}>
                        {t.projects[project.category]}
                      </span>
                      <span className="font-mono text-[10px] tracking-widest text-white/60 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-md">
                        N°{String(project.id).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="font-inter text-xs text-white/70 mb-1">
                        {project.year} · {project.client} · {project.sector}
                      </p>
                      <h3 className="font-poppins font-bold text-lg text-white">{project.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="font-inter text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                      {project.longDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map(tag => (
                        <span key={tag} className="font-inter text-xs bg-gray-100 dark:bg-navy-700
                          text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => setSelected(project)}
                      className="inline-flex items-center gap-1.5 font-inter font-medium text-sm
                        text-brand-orange hover:gap-2.5 transition-all"
                    >
                      {t.projects.view}
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className=" max-h-screen relative">
      {selected && (
        <ProjectModal
          project={selected}
          onClose={() => setSelected(null)}
        />
      )}
</section>

      <CTABanner />
    </>
  );
}