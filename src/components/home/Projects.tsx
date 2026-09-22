import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/ui/ProjectCard';
import { useLanguage } from '@/hooks/useLanguage';

export default function Projects() {
  const { t, lang } = useLanguage();
  return (
    <section className="py-20 md:py-28 bg-gray-50 dark:bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-brand-orange mb-3">{t.projects.subtitle}</p>
          <h2 className="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl text-navy dark:text-white mb-4">{t.projects.title}</h2>
          <p className="font-inter text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">{t.projects.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map(project => <ProjectCard key={project.id} project={project} />)}
        </div>
        <div className="mt-10 text-center">
          <Link to="/projets" className="inline-flex items-center gap-2 font-poppins font-semibold text-brand-orange hover:underline">
            {lang === 'fr' ? 'Toutes nos réalisations' : 'All our projects'}<ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
