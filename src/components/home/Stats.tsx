import { useState, useRef, useEffect, useCallback } from 'react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import Marquee from '@/components/ui/Marquee';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const SLIDE_DURATION = 3400; // ms

// 1. Hook personnalisé ultra-stable pour remplacer le setTimeout
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

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

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 2. Fonction de changement de slide mémoïsée
  const handleNextSlide = useCallback(() => {
    setCurrent((curr) => (curr + 1) % stats.length);
  }, [stats.length]);

  // 3. Utilisation du hook d'intervalle sécurisé
  useInterval(handleNextSlide, isPaused ? null : SLIDE_DURATION);

  const handleDotClick = (i: number) => {
    if (i === current) return;
    setCurrent(i);
  };

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} className="relative bg-white dark:bg-navy-900 overflow-hidden">
      {/* Marquee top strip */}
            {/* Marquee top strip - Animation responsive 100% CSS */}
            <div className="bg-navy dark:bg-black py-3 border-y border-white/5 overflow-hidden relative z-10">
        <div className="flex whitespace-nowrap overflow-hidden">
          {/* On duplique les éléments pour créer l'effet de boucle infinie */}
          <div className="flex animate-marquee items-center gap-6 sm:gap-12 md:gap-16">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center gap-6 sm:gap-12 md:gap-16">
                <span className="font-poppins font-semibold text-[10px] sm:text-xs md:text-sm text-white/80 uppercase tracking-wider">
                  {item}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              </span>
            ))}
          </div>
        </div>
        
        {/* CSS de l'animation */}
       
      </div>

      {/* Stats Slider */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile/tablet: slider */}
        <div 
          className="block lg:hidden relative w-full max-w-md mx-auto min-h-[140px] flex flex-col items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
                i === current 
                  ? "opacity-100 pointer-events-auto scale-100 z-10" 
                  : "opacity-0 pointer-events-none scale-95 z-0"
              }`}
              aria-hidden={i !== current}
            >
              <div className="relative inline-block">
                {/* Glow */}
                <div className="absolute inset-0 blur-2xl opacity-20
                  bg-gradient-to-br from-brand-orange to-electric-500 rounded-full" />
                <p className="relative font-poppins font-black text-4xl sm:text-5xl
                  text-navy dark:text-white transition-colors duration-300">
                  {/* 4. KEY FORCÉE avec stat.target pour remonter le composant à chaque slide */}
                  <AnimatedCounter 
                    key={stat.target + stat.suffix} 
                    target={stat.target} 
                    suffix={stat.suffix} 
                  />
                </p>
              </div>
              <p className="font-inter text-base text-gray-500 dark:text-gray-400 mt-3 leading-tight">
                {stat.label}
              </p>
            </div>
          ))}

          {/* Slider dots */}
          <div className="flex justify-center items-center gap-3 mt-[140px] relative z-20">
            {stats.map((_, i) => (
              <button
                key={i}
                className={`w-8 h-2 rounded-full border transition-all duration-500 relative overflow-hidden ${
                  i === current
                    ? "border-brand-orange bg-brand-orange"
                    : "border-gray-300 dark:border-gray-600 bg-transparent hover:border-brand-orange/50"
                }`}
                style={{ outline: 'none' }}
                aria-label={`Voir statistique ${i+1}`}
                tabIndex={0}
                onClick={() => handleDotClick(i)}
              >
                {/* Barre de progression animée lorsque c'est la diapositive active */}
                {i === current && (
                  <span 
                    // 5. Syntaxe Tailwind arbitraire pour éviter le purge CSS
                    className="absolute inset-0 bg-brand-orange/30 rounded-full [animation:slide-fill_linear_forwards]"
                    style={{ animationDuration: `${SLIDE_DURATION}ms` }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop: grid */}
        <div className="hidden lg:grid grid-cols-4 gap-4">
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
                <p className="relative font-poppins font-black text-5xl lg:text-6xl
                  text-navy dark:text-white group-hover:text-brand-orange transition-colors duration-300">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </p>
              </div>
              <p className="font-inter text-base text-gray-500 dark:text-gray-400
                mt-3 leading-tight">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CSS clé pour l'animation des dots */}
      <style>{`
        @keyframes slide-fill {
          from { width: 0%; left: 0%; }
          to { width: 100%; left: 0%; }
        }
      `}</style>
    </section>
  );
}