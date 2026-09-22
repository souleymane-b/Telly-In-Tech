import { ArrowUpRight } from 'lucide-react';
import { type Project, sectorLabels } from '@/data/projects';
import { useLanguage } from '@/hooks/useLanguage';

export default function ProjectCard({ project }: { project: Project }) {
  const { t, lang } = useLanguage();

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t.projects.view} : ${project.title}${
        lang === 'fr' ? ' (nouvel onglet)' : ' (new tab)'
      }`}
      className="
        group block h-full overflow-hidden
        rounded-2xl
        border border-gray-100 dark:border-navy-700
        bg-white dark:bg-navy-800
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-brand-lg
        focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-4 focus-visible:outline-brand-orange
      "
    >
      {/* IMAGE : même ratio et même cadrage pour tous */}
      <div
        className="relative w-full aspect-[16/9] overflow-hidden"
        style={{ backgroundColor: project.brandBackground }}
      >
        <img
          src={project.brandImage}
          alt={project.title}
          loading="lazy"
          decoding="async"
          width={1600}
          height={900}
          className="
            absolute inset-0
            w-full h-full
            object-cover
            object-center
            transition-transform duration-700
            ease-out
            motion-safe:group-hover:scale-[1.03]
          "
        />

        {/* léger rendu premium */}
        <div
          className="
            pointer-events-none
            absolute inset-0
            bg-gradient-to-t
            from-black/[0.05]
            via-transparent
            to-white/[0.03]
          "
        />
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <span
          className="
            inline-block
            bg-brand-orange/10
            text-brand-orange
            text-xs font-inter font-medium
            px-3 py-1 rounded-full mb-4
          "
        >
          {sectorLabels[project.sector][lang]}
        </span>

        <p className="
          font-inter text-xs
          text-gray-500 dark:text-gray-400
          break-all mb-2
        ">
          {new URL(project.url).hostname}
        </p>

        <h3 className="
          font-poppins font-bold text-xl
          text-navy dark:text-white mb-3
        ">
          {project.title}
        </h3>

        <p className="
          font-inter text-sm
          text-gray-500 dark:text-gray-400
          leading-relaxed mb-5
        ">
          {lang === 'fr'
            ? project.description
            : project.descriptionEn}
        </p>

        <span className="
          inline-flex items-center gap-2
          font-inter font-medium text-sm
          text-brand-orange
        ">
          {t.projects.view}

          <ArrowUpRight
            size={16}
            aria-hidden="true"
            className="
              transition-transform duration-300
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          />
        </span>
      </div>
    </a>
  );
}