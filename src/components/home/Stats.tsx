import AnimatedCounter from '@/components/ui/AnimatedCounter';
import Marquee from '@/components/ui/Marquee';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Stats() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();

  const stats = [
    { target: 45, suffix: '+', label: t.stats.clients },
    { target: 60, suffix: '+', label: t.stats.projects },
    { target: 3, suffix: '', label: t.stats.years },
    { target: 98, suffix: '%', label: t.stats.satisfaction },
  ];

  const marqueeItems = [
    'Transformation Digitale',
    'Innovation',
    'Excellence',
    'Ancrage Local',
    'Croissance',
    'Impact Social',
    'Web Sur-Mesure',
    'Mobile First',
  ];

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} className="relative bg-white dark:bg-navy-900 overflow-hidden">
      {/* Marquee top strip */}
      <div className="bg-navy dark:bg-black py-3 border-y border-white/5 overflow-hidden">
        <Marquee>
          {marqueeItems.map((item, i) => (
            <span key={i} className="flex items-center gap-12">
              <span className="font-poppins font-semibold text-sm text-white/80 uppercase tracking-wider">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* Stats grid */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`animate-on-scroll-scale delay-${i * 100} text-center group`}
            >
              <div className="relative inline-block">
                {/* Glow */}
                <div className="absolute inset-0 blur-2xl opacity-20 group-hover:opacity-50
                  transition-opacity duration-500
                  bg-gradient-to-br from-brand-orange to-electric-500 rounded-full" />
                <p className="relative font-poppins font-black text-4xl md:text-5xl lg:text-6xl
                  text-navy dark:text-white group-hover:text-brand-orange transition-colors duration-300">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </p>
              </div>
              <p className="font-inter text-sm md:text-base text-gray-500 dark:text-gray-400
                mt-3 leading-tight">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
