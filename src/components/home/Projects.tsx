import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import TiltCard from '@/components/ui/TiltCard';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Project {
  id: number;
  title: string;
  category: 'web' | 'mobile' | 'marketing';
  image: string;
  description: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Plateforme E-commerce Guinée',
    category: 'web',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Marketplace en ligne pour artisans guinéens avec paiement mobile money intégré.',
    tags: ['React', 'Node.js', 'Mobile Money'],
  },
  {
    id: 2,
    title: 'App Santé Communautaire',
    category: 'mobile',
    image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Application mobile pour le suivi des consultations dans les centres de santé ruraux.',
    tags: ['React Native', 'Firebase', 'Offline'],
  },
  {
    id: 3,
    title: 'Campagne Digitale ONG',
    category: 'marketing',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Stratégie de contenu et gestion des réseaux sociaux pour une ONG de développement.',
    tags: ['Social Media', 'SEO', 'Content'],
  },
  {
    id: 4,
    title: 'Portail E-Gouvernance',
    category: 'web',
    image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Plateforme de services administratifs en ligne pour les citoyens guinéens.',
    tags: ['Vue.js', 'API REST', 'Sécurité'],
  },
  {
    id: 5,
    title: 'App Livraison Conakry',
    category: 'mobile',
    image: 'https://images.pexels.com/photos/4498136/pexels-photo-4498136.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Application de livraison de repas avec géolocalisation et paiement intégré.',
    tags: ['Flutter', 'Maps API', 'Stripe'],
  },
  {
    id: 6,
    title: 'Branding Startup Tech',
    category: 'marketing',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Identité visuelle et stratégie de lancement pour une startup technologique.',
    tags: ['Branding', 'Strategy', 'Design'],
  },
];

export default function Projects() {
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
    <section ref={sectionRef as React.RefObject<HTMLElement>} className="relative py-20 md:py-28 bg-white dark:bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-on-scroll">
          <SectionHeader
            subtitle={t.projects.subtitle}
            title={t.projects.title}
            description={t.projects.description}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 animate-on-scroll delay-100">
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className={`animate-on-scroll-scale delay-${(i % 3) * 100} perspective-1000`}
            >
              <TiltCard
                maxTilt={6}
                glare={false}
                className="group relative rounded-2xl overflow-hidden
                  bg-gray-50 dark:bg-navy-800 border border-gray-100 dark:border-navy-700
                  hover:shadow-brand-lg h-full w-full"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700
                      group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent
                    transition-opacity duration-500 group-hover:from-navy/95" />

                  {/* Category badge */}
                  <span className="absolute top-3 left-3 bg-brand-orange text-white text-xs
                    font-inter font-medium px-3 py-1 rounded-full backdrop-blur-sm
                    transition-transform duration-300 group-hover:scale-110">
                    {t.projects[project.category]}
                  </span>

                  {/* Hover arrow */}
                  <div className="absolute top-3 right-3 w-9 h-9 bg-white/20 backdrop-blur-md rounded-full
                    flex items-center justify-center opacity-0 group-hover:opacity-100
                    transition-all duration-300 group-hover:scale-110">
                    <ArrowUpRight size={16} className="text-white" />
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4
                    transition-transform duration-500 group-hover:translate-y-0 translate-y-0">
                    <h3 className="font-poppins font-bold text-lg text-white">{project.title}</h3>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <p className="font-inter text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="font-inter text-xs bg-gray-100 dark:bg-navy-700
                        text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-md
                        transition-colors group-hover:bg-brand-orange/10 group-hover:text-brand-orange">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-12 animate-on-scroll">
          <Link
            to="/projets"
            className="inline-flex items-center gap-2 font-poppins font-semibold text-sm text-navy dark:text-white
              border-2 border-navy dark:border-white hover:bg-navy hover:text-white dark:hover:bg-white
              dark:hover:text-navy px-7 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5"
          >
            Voir tous nos projets
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
