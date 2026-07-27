import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import PixelPattern from '@/components/ui/PixelPattern';
import Magnetic from '@/components/ui/Magnetic';

export default function CTABanner() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-20 md:py-24 overflow-hidden noise-overlay">
      {/* Kinetic gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #212d55, #1a2444, #0c71b9, #1a2444, #212d55)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 10s ease infinite',
        }}
      />
      <PixelPattern dark opacity={0.2} />

      {/* Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
        bg-brand-orange/10 rounded-full blur-3xl animate-glow-pulse" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-on-scroll">
          <h2 className="font-poppins font-black text-3xl md:text-4xl lg:text-5xl text-white mb-4 leading-tight">
            Donnons vie à votre{' '}
            <span className="text-gradient-orange inline-block">projet digital</span>
          </h2>
        </div>
        <p className="animate-on-scroll delay-100 font-inter text-base md:text-lg text-blue-100/80
          max-w-2xl mx-auto mb-8 leading-relaxed">
          Que vous soyez une entreprise, une ONG ou un porteur d'initiative, notre équipe vous accompagne
          à chaque étape de votre transformation digitale.
        </p>
        <div className="animate-on-scroll delay-200">
          <Magnetic strength={0.3}>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark
                text-white font-poppins font-semibold px-8 py-4 rounded-full transition-all duration-300
                hover:shadow-glow-orange hover:-translate-y-0.5 active:translate-y-0 text-sm
                relative overflow-hidden"
            >
              <span className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100" />
              <span className="relative z-10">{t.nav.cta}</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
