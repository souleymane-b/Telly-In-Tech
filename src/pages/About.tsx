import { Target, Eye, Heart, Check, ChevronDown, Quote, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import PixelPattern from '@/components/ui/PixelPattern';
import CTABanner from '@/components/home/CTABanner';
import Team from '@/components/home/Team';

export default function About() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();

  const pillars = [
    { icon: Target, title: t.about.mission, text: t.about.mission_text, color: 'orange' },
    { icon: Eye, title: t.about.vision, text: t.about.vision_text, color: 'blue' },
    { icon: Heart, title: t.about.values, text: t.about.values_text, color: 'orange' },
  ];

  const values = [
    'Qualité sans compromis',
    'Ancrage local profond',
    'Tarifs justes et adaptés',
    'Engagement social',
    'Innovation continue',
    'Transparence et confiance',
  ];

  return (
    <>
      {/* Header */}
      <section className="relative pt-32 pb-24 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-700 to-electric-700 opacity-95" />
        <PixelPattern dark opacity={0.25} />

        {/* subtle animated accent line */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-brand-orange to-transparent opacity-60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-brand-orange mb-3">
            {t.about.subtitle}
          </p>
          <h1 className="font-poppins font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            {t.about.title}
          </h1>
          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-brand-orange to-electric-500 mx-auto" />
        </div>

        <div className="relative z-10 flex justify-center mt-14">
          <ChevronDown className="text-white/40 animate-bounce" size={22} />
        </div>
      </section>

      {/* Story */}
      <section className="py-24" style={{ background: '#fff' }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="relative text-center">
            <Quote
              className="mx-auto mb-6 text-brand-orange/20"
              size={48}
              strokeWidth={1.5}
            />
            <p className="font-inter text-lg md:text-2xl leading-relaxed text-navy font-medium">
              {t.about.description}
            </p>
          </div>
        </div>
      </section>
      {/* Te */}
      <section>
        <Team />
      </section>
      {/* Mission / Vision / Values */}
      <section
        ref={sectionRef as React.RefObject<HTMLElement>}
        className="py-10 md:py-18 bg-gray-50 dark:bg-navy-800 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {/* connecting trace between the three pillars, desktop only */}
            <div className="hidden md:block absolute top-8 left-[16.6%] right-[16.6%] h-px bg-gradient-to-r from-brand-orange via-gray-300 dark:via-navy-600 to-electric-500" />

            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              const isOrange = pillar.color === 'orange';
              return (
                <div key={i} className="relative flex items-center md:block">
                  <div
                    className={`animate-on-scroll delay-${i * 100} group relative bg-white dark:bg-navy-700 rounded-2xl p-8
                      border border-gray-100 dark:border-navy-600 hover:shadow-brand-lg
                      transition-all duration-500 hover:-translate-y-1 text-center w-full z-10`}
                  >
                    <span
                      className={`font-poppins absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold tracking-widest
                        text-white px-2.5 py-0.5 rounded-full ${isOrange ? 'bg-brand-orange' : 'bg-electric-500'}`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 mt-2
                      transition-all duration-300 group-hover:scale-110 ${
                        isOrange
                          ? 'bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white'
                          : 'bg-electric-500/10 text-electric-500 group-hover:bg-electric-500 group-hover:text-white'
                      }`}
                    >
                      <Icon size={28} />
                    </div>
                    <h3 className="font-poppins font-bold text-xl text-navy dark:text-white mb-3">
                      {pillar.title}
                    </h3>
                    <p className="font-inter text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {pillar.text}
                    </p>
                  </div>

                  {i < pillars.length - 1 && (
                    <ArrowRight
                      className="hidden md:block absolute -right-5 top-8 z-20 text-gray-300 dark:text-navy-600"
                      size={18}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Values list */}
          <div className="mt-20 max-w-3xl mx-auto animate-on-scroll">
            <div className="text-center mb-8">
              <p className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-brand-orange mb-2">
                Ce qui nous guide
              </p>
              <h3 className="font-poppins font-bold text-2xl text-navy dark:text-white">
                Nos Valeurs
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((value, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-3 bg-white dark:bg-navy-700 rounded-xl p-4 pl-5
                    border border-gray-100 dark:border-navy-600 border-l-4 border-l-transparent
                    hover:border-l-brand-orange transition-all duration-300"
                >
                  <div
                    className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0
                      transition-colors duration-300 group-hover:bg-brand-orange"
                  >
                    <Check size={16} className="text-brand-orange transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <span className="font-inter text-sm text-gray-700 dark:text-gray-200 font-medium">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

     

      <CTABanner />
    </>
  );
}