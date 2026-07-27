import { Link } from 'react-router-dom';
import { Code2, Smartphone, Megaphone, Lightbulb, GraduationCap, ShieldCheck, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import TiltCard from '@/components/ui/TiltCard';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Services() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();

  const services = [
    { icon: Code2, ...t.services.web, color: 'orange' },
    { icon: Smartphone, ...t.services.mobile, color: 'blue' },
    { icon: Megaphone, ...t.services.marketing, color: 'orange' },
    { icon: Lightbulb, ...t.services.conseil, color: 'blue' },
    { icon: GraduationCap, ...t.services.formation, color: 'orange' },
    { icon: ShieldCheck, ...t.services.cyber, color: 'blue' },
  ];

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} className="relative py-20 md:py-28 bg-gray-50 dark:bg-navy-800 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-electric-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="animate-on-scroll">
          <SectionHeader
            subtitle={t.services.subtitle}
            title={t.services.title}
            description={t.services.description}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isOrange = service.color === 'orange';
            return (
              <div
                key={i}
                className={`animate-on-scroll-scale delay-${(i % 3) * 100} perspective-1000`}
              >
                <TiltCard
                  maxTilt={8}
                  className={`group relative bg-white dark:bg-navy-700
                    rounded-2xl p-7 border border-gray-100 dark:border-navy-600
                    hover:shadow-brand-lg h-full w-full overflow-hidden`}
                >
                  {/* Hover gradient bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${
                    isOrange ? 'bg-brand-orange' : 'bg-electric-500'
                  } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

                  {/* Background glow on hover */}
                  <div className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0
                    group-hover:opacity-20 transition-opacity duration-500 ${
                      isOrange ? 'bg-brand-orange' : 'bg-electric-500'
                    }`} />

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300
                    group-hover:scale-110 ${
                      isOrange
                        ? 'bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white'
                        : 'bg-electric-500/10 text-electric-500 group-hover:bg-electric-500 group-hover:text-white'
                    }`}>
                    <Icon size={26} />
                  </div>

                  <h3 className="font-poppins font-bold text-xl text-navy dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="font-inter text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
                    {service.desc}
                  </p>

                  <Link
                    to="/services"
                    className={`inline-flex items-center gap-1.5 font-inter font-medium text-sm
                      ${isOrange ? 'text-brand-orange' : 'text-electric-500'}
                      hover:gap-2.5 transition-all relative z-10`}
                  >
                    En savoir plus
                    <ArrowRight size={14} />
                  </Link>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
