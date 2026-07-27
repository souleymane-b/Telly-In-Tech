import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import PixelPattern from '@/components/ui/PixelPattern';
import SplitText from '@/components/ui/SplitText';
import Magnetic from '@/components/ui/Magnetic';

export default function Hero() {
  const { t } = useLanguage();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-navy">
      {/* Kinetic gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #212d55, #1a2444, #0c71b9, #1a2444, #212d55)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 12s ease infinite',
        }}
      />

      {/* Pixel pattern */}
      <PixelPattern dark opacity={0.3} />

      {/* Floating gradient orbs with parallax */}
      <div
        className="absolute top-1/4 -left-20 w-72 h-72 bg-brand-orange/20 rounded-full blur-3xl animate-float"
        style={{ transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)` }}
      />
      <div
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-electric-500/20 rounded-full blur-3xl animate-float-slow"
        style={{ transform: `translate(${mousePos.x * -60}px, ${mousePos.y * -60}px)` }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px]
          bg-brand-orange/5 rounded-full blur-3xl animate-glow-pulse pointer-events-none"
        style={{
          transform: `translate(calc(-50% + ${mousePos.x * 20}px), calc(-50% + ${mousePos.y * 20}px))`,
        }}
      />

      {/* Rotating ring decorations */}
      <div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] opacity-10 pointer-events-none"
        style={{ transform: `translate(calc(-50% + ${mousePos.x * -15}px), calc(-50% + ${mousePos.y * -15}px))` }}
      >
        <svg viewBox="0 0 600 600" className="w-full h-full animate-spin-slow">
          <circle cx="300" cy="300" r="290" fill="none" stroke="#ea570d" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="300" cy="300" r="250" fill="none" stroke="#0c71b9" strokeWidth="1" strokeDasharray="2 6" />
        </svg>
      </div>
      <div
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] opacity-10 pointer-events-none"
        style={{ transform: `translate(calc(-50% + ${mousePos.x * 25}px), calc(-50% + ${mousePos.y * 25}px))` }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full animate-spin-reverse">
          <circle cx="200" cy="200" r="190" fill="none" stroke="#0c71b9" strokeWidth="1" strokeDasharray="6 4" />
        </svg>
      </div>

      {/* ---- Content ---- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge — appears first */}
          <div className="animate-fade-up animation-delay-100 inline-flex items-center gap-2 bg-white/10
            backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8 overflow-hidden relative">
            <span className="absolute inset-0 shimmer-bg" />
            <Sparkles size={14} className="text-brand-orange relative z-10" />
            <span className="font-inter text-xs text-white/90 font-medium tracking-wide relative z-10">
              {t.hero.badge}
            </span>
          </div>

          {/* Headline — SplitText word-by-word reveal */}
          <h1 className="font-poppins font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl
            leading-[1.05] text-white mb-2">
            {/* Line 1 — starts revealing at 300ms */}
            <span className="block overflow-hidden">
              <SplitText text={t.hero.headline1} delay={300} stagger={0.06} />
            </span>
            {/* Line 2 — starts at 600ms */}
            <span className="block overflow-hidden">
              <span className="text-gradient-kinetic">
                <SplitText text={t.hero.headline2} delay={600} stagger={0.06} />
              </span>
            </span>
            {/* Line 3 — starts at 900ms */}
            <span className="block overflow-hidden">
              <SplitText text={t.hero.headline3} delay={900} stagger={0.06} />
            </span>
          </h1>

          {/* Subheadline — CSS animation, no inline opacity */}
          <p className="animate-fade-up animation-delay-1100
            font-poppins font-medium text-lg md:text-xl text-blue-200 mt-6 mb-4">
            {t.hero.subheadline}
          </p>

          {/* Description */}
          <p className="animate-fade-up animation-delay-1300
            font-inter text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
            {t.hero.description}
          </p>

          {/* CTAs */}
          <div className="animate-fade-up animation-delay-1500
            flex flex-col sm:flex-row items-center justify-center gap-4">
            <Magnetic strength={0.25}>
              <Link
                to="/services"
                className="group flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark
                  text-white font-poppins font-semibold px-7 py-3.5 rounded-full transition-all duration-300
                  hover:shadow-glow-orange hover:-translate-y-0.5 text-sm relative overflow-hidden"
              >
                <span className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100" />
                <span className="relative z-10">{t.hero.cta_primary}</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link
                to="/projets"
                className="group flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20
                  text-white font-poppins font-semibold px-7 py-3.5 rounded-full transition-all duration-300
                  hover:bg-white/20 hover:-translate-y-0.5 text-sm"
              >
                {t.hero.cta_secondary}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2 animate-bounce-slow">
          <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
