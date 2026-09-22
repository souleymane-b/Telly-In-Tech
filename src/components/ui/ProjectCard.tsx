import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { type Project, sectorLabels } from '@/data/projects';
import { useLanguage } from '@/hooks/useLanguage';

export default function ProjectCard({ project }: { project: Project }) {
  const { t, lang } = useLanguage();

  const hostname = new URL(project.url).hostname.replace('www.', '');

  return (
    <article
      className="
        group relative flex h-full flex-col overflow-hidden
        rounded-[28px]
        border border-slate-200/70 dark:border-white/10
        bg-white dark:bg-navy-800
        shadow-[0_12px_40px_rgba(15,23,42,0.06)]
        transition-all duration-500
        hover:-translate-y-2
        hover:shadow-[0_28px_70px_rgba(15,23,42,0.16)]
      "
    >
      {/* BRAND VISUAL */}
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-[16/9] overflow-hidden"
        aria-label={`${t.projects.view} : ${project.title}`}
      >
        <img
          src={project.brandImage}
          alt={`Présentation de ${project.title}`}
          loading="lazy"
          decoding="async"
          width={1600}
          height={900}
          className="
            absolute inset-0
            h-full w-full
            object-cover object-center
            transition-transform
            duration-700 ease-out
            group-hover:scale-[1.035]
          "
        />

        {/* subtle overlay */}
        <div
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-t
            from-navy/20 via-transparent to-transparent
          "
        />

        {/* sector badge */}
        <div className="absolute left-5 top-5">
          <span
            className="
              inline-flex items-center
              rounded-full
              border border-white/20
              bg-brand-orange
              px-4 py-2
              font-inter text-xs font-semibold text-white
              shadow-lg backdrop-blur-md
            "
          >
            {sectorLabels[project.sector][lang]}
          </span>
        </div>

        {/* hover button */}
        <div
          className="
            absolute bottom-5 right-5
            flex h-11 w-11 items-center justify-center
            rounded-full
            bg-white text-navy
            shadow-xl
            opacity-0 translate-y-3
            transition-all duration-300
            group-hover:opacity-100
            group-hover:translate-y-0
          "
        >
          <ExternalLink size={18} />
        </div>
      </a>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-7 md:p-8">

        <p
          className="
            mb-3 font-inter text-xs font-medium
            tracking-wide text-gray-400
            dark:text-gray-500
          "
        >
          {hostname}
        </p>

        <h3
          className="
            mb-3 font-poppins
            text-[22px] font-bold
            tracking-[-0.02em]
            text-navy dark:text-white
            md:text-2xl
          "
        >
          {project.title}
        </h3>

        <p
          className="
            mb-7
            font-inter text-sm
            leading-7
            text-gray-500 dark:text-gray-400
            md:text-[15px]
          "
        >
          {lang === 'fr'
            ? project.description
            : project.descriptionEn}
        </p>

        {/* push CTA to bottom */}
        <div className="mt-auto">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2
              font-inter text-sm font-semibold
              text-brand-orange
              transition-all duration-300
              hover:gap-3
            "
          >
            {t.projects.view}

            <ArrowUpRight
              size={17}
              className="
                transition-transform duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </a>
        </div>
      </div>

      {/* bottom accent */}
      <div
        className="
          absolute bottom-0 left-0
          h-[3px] w-0
          bg-brand-orange
          transition-all duration-500
          group-hover:w-full
        "
      />
    </article>
  );
}