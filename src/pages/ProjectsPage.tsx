import { useState } from 'react';
import CTABanner from '@/components/home/CTABanner';
import ProjectCard from '@/components/ui/ProjectCard';
import { projects, sectorLabels, type ProjectSector } from '@/data/projects';
import { useLanguage } from '@/hooks/useLanguage';

export default function ProjectsPage() {
  const { t, lang } = useLanguage();
  const [sector, setSector] = useState<'all' | ProjectSector>('all');
  const filters: { key: 'all' | ProjectSector; label: string }[] = [
    { key: 'all', label: t.projects.allSectors },
    ...Object.entries(sectorLabels).map(([key, label]) => ({ key: key as ProjectSector, label: label[lang] })),
  ];
  const filtered = projects.filter(project => sector === 'all' || project.sector === sector);
  return (
    <>
      <section className="relative pt-32 pb-16 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-700 to-electric-700 opacity-95" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-brand-orange mb-3">{t.projects.subtitle}</p>
          <h1 className="font-poppins font-black text-4xl md:text-5xl lg:text-6xl text-white mb-4">{t.projects.title}</h1>
          <p className="font-inter text-base md:text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed">{t.projects.description}</p>
        </div>
      </section>
      <section className="py-20 md:py-28 bg-white dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div role="group" aria-label={t.projects.filterBySector} className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map(filter => (
              <button key={filter.key} onClick={() => setSector(filter.key)} aria-pressed={sector === filter.key}
                className={'rounded-full px-5 py-2 font-inter text-sm transition-colors ' + (sector === filter.key ? 'bg-brand-orange text-white' : 'bg-gray-100 dark:bg-navy-800 text-gray-600 dark:text-gray-300 hover:bg-brand-orange/10')}>
                {filter.label}
              </button>
            ))}
          </div>
          <div
  className="
    grid grid-cols-1
    md:grid-cols-2
    gap-7 lg:gap-9
    items-stretch
  "
>
  {filtered.map((project) => (
    <ProjectCard
      key={project.id}
      project={project}
    />
  ))}
</div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
