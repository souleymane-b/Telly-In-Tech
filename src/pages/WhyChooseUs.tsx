import { Link } from 'react-router-dom';
import {
  MapPin, Heart, Layers, Infinity as InfinityIcon, Wallet, Check, ArrowRight,
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link as RouterLink } from 'react-router-dom';

const icons = [MapPin, Heart, Layers, InfinityIcon, Wallet];
const accents = ['orange', 'electric', 'orange', 'electric', 'orange'] as const;

export default function WhyChooseUs() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();

  return (
    <>
      {/* Hero header */}
      <section className="relative pt-32 pb-16 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-700 to-electric-700 opacity-95" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl animate-float-slow" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-brand-orange mb-3">
            {t.whyPage.subtitle}
          </p>
          <h1 className="font-poppins font-black text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            {t.whyPage.title}
          </h1>
          <p className="font-inter text-base md:text-lg text-blue-100/80 max-w-3xl mx-auto leading-relaxed">
            {t.whyPage.description}
          </p>
        </div>
      </section>

      {/* Features — alternating layout */}
      <section
        ref={sectionRef as React.RefObject<HTMLElement>}
        className="py-20 md:py-28 bg-white dark:bg-navy-900 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {t.whyPage.features.map((feature, i) => {
            const Icon = icons[i];
            const isOrange = accents[i] === 'orange';
            const isReversed = i % 2 === 1;

            return (
              <div
                key={i}
                className={`animate-on-scroll delay-100 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center
                  ${i > 0 ? 'mt-20 lg:mt-28' : ''}`}
              >
                {/* Text */}
                <div className={isReversed ? 'lg:order-2' : ''}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6
                    ${isOrange
                      ? 'bg-brand-orange/10 text-brand-orange'
                      : 'bg-electric-500/10 text-electric-500'
                    }`}>
                    <Icon size={30} />
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <span className={`font-poppins font-black text-5xl lg:text-6xl
                      ${isOrange ? 'text-brand-orange/20' : 'text-electric-500/20'}`}>
                      0{i + 1}
                    </span>
                    <h2 className="font-poppins font-bold text-2xl md:text-3xl text-navy dark:text-white">
                      {feature.title}
                    </h2>
                  </div>

                  <p className="font-inter text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-6 max-w-xl">
                    {feature.desc}
                  </p>

                  <ul className="space-y-3">
                    {feature.points.map((point, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0
                          ${isOrange ? 'bg-brand-orange/10' : 'bg-electric-500/10'}`}>
                          <Check size={14} className={isOrange ? 'text-brand-orange' : 'text-electric-500'} />
                        </div>
                        <span className="font-inter text-sm md:text-base text-gray-600 dark:text-gray-300">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual */}
                <div className={isReversed ? 'lg:order-1' : ''}>
                  <div className={`relative aspect-[4/3] rounded-3xl overflow-hidden
                    ${isOrange
                      ? 'bg-gradient-to-br from-brand-orange/10 to-brand-orange/5'
                      : 'bg-gradient-to-br from-electric-500/10 to-electric-500/5'
                    }`}>
                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `radial-gradient(circle at 20% 80%, ${isOrange ? '#f97316' : '#3b82f6'}33 0%, transparent 50%),
                                          radial-gradient(circle at 80% 20%, ${isOrange ? '#f97316' : '#3b82f6'}22 0%, transparent 50%)`,
                      }}
                    />
                    {/* Large icon centerpiece */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-32 h-32 rounded-3xl flex items-center justify-center
                        ${isOrange
                          ? 'bg-gradient-to-br from-brand-orange to-brand-orange-dark shadow-orange'
                          : 'bg-gradient-to-br from-electric-500 to-electric-700 shadow-blue'
                        }`}>
                        <Icon size={64} className="text-white" />
                      </div>
                    </div>
                    {/* Floating accent dots */}
                    <div className={`absolute top-8 right-8 w-3 h-3 rounded-full
                      ${isOrange ? 'bg-brand-orange' : 'bg-electric-500'} animate-float`} />
                    <div className={`absolute bottom-12 left-10 w-2 h-2 rounded-full
                      ${isOrange ? 'bg-brand-orange' : 'bg-electric-500'} animate-float-slow`} />
                    <div className={`absolute top-1/2 right-12 w-4 h-4 rounded-full border-2
                      ${isOrange ? 'border-brand-orange' : 'border-electric-500'} animate-float`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-24 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-700 to-electric-700 opacity-95" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl animate-float" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-white mb-4">
            {t.whyPage.ctaTitle}
          </h2>
          <p className="font-inter text-base md:text-lg text-blue-100/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t.whyPage.ctaDesc}
          </p>
          <RouterLink
            to="/contact"
            className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark
              text-white font-poppins font-semibold text-base px-8 py-4 rounded-full
              transition-all duration-300 hover:shadow-orange hover:-translate-y-0.5"
          >
            {t.whyPage.ctaButton}
            <ArrowRight size={18} />
          </RouterLink>
        </div>
      </section>
    </>
  );
}
