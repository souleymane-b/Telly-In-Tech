import { Award, MapPin, Wallet, Headphones } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import TiltCard from '@/components/ui/TiltCard';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import PixelPattern from '@/components/ui/PixelPattern';

export default function WhyChooseUs() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();

  const features = [
    { icon: Award, ...t.why.quality },
    { icon: MapPin, ...t.why.local },
    { icon: Wallet, ...t.why.price },
    { icon: Headphones, ...t.why.support },
  ];

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} className="relative py-20 md:py-28 bg-navy overflow-hidden noise-overlay">
      <PixelPattern dark opacity={0.15} />

      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl animate-float-slow" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-on-scroll">
          <SectionHeader
            subtitle={t.why.subtitle}
            title={t.why.title}
            light
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className={`animate-on-scroll-scale delay-${i * 100} perspective-1000`}
              >
                <TiltCard
                  maxTilt={12}
                  className="group glass rounded-2xl p-7
                    hover:bg-white/15 h-full w-full"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-orange to-brand-orange-dark
                    flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300
                    shadow-orange">
                    <Icon size={26} className="text-white" />
                  </div>
                  <h3 className="font-poppins font-bold text-lg text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="font-inter text-sm text-blue-100/80 leading-relaxed">
                    {feature.desc}
                  </p>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
