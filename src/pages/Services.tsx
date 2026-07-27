import { Code2, Smartphone, Megaphone, Lightbulb, GraduationCap, ShieldCheck, Check } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import CTABanner from '@/components/home/CTABanner';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Services() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();

  const services = [
    {
      icon: Code2,
      ...t.services.web,
      features: ['Sites vitrine & e-commerce', 'Plateformes sur-mesure', 'Optimisation SEO', 'Maintenance & support'],
      color: 'orange',
    },
    {
      icon: Smartphone,
      ...t.services.mobile,
      features: ['iOS & Android natifs', 'Applications hybrides', 'UX/UI design', 'Publication sur stores'],
      color: 'blue',
    },
    {
      icon: Megaphone,
      ...t.services.marketing,
      features: ['Stratégie de contenu', 'SEO & SEA', 'Gestion des réseaux sociaux', 'Campagnes publicitaires'],
      color: 'orange',
    },
    {
      icon: Lightbulb,
      ...t.services.conseil,
      features: ['Audit de maturité digitale', 'Feuille de route IT', 'Accompagnement stratégique', 'Choix technologiques'],
      color: 'blue',
    },
    {
      icon: GraduationCap,
      ...t.services.formation,
      features: ['Formations sur-mesure', 'Bureautique avancée', 'Outils collaboratifs', 'Culture digitale'],
      color: 'orange',
    },
    {
      icon: ShieldCheck,
      ...t.services.cyber,
      features: ['Audit de sécurité', 'Protection des données', 'Mise en conformité', 'Sensibilisation équipes'],
      color: 'blue',
    },
  ];

  return (
    <>
      {/* Page header */}
      <section className="relative pt-32 pb-16 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-700 to-electric-700 opacity-95" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-brand-orange mb-3">
            {t.services.subtitle}
          </p>
          <h1 className="font-poppins font-black text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            {t.services.title}
          </h1>
          <p className="font-inter text-base md:text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            {t.services.description}
          </p>
        </div>
      </section>

      {/* Services detail */}
      <section ref={sectionRef as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-white dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, i) => {
              const Icon = service.icon;
              const isOrange = service.color === 'orange';
              return (
                <div
                  key={i}
                  className={`animate-on-scroll delay-${(i % 2) * 100} group bg-gray-50 dark:bg-navy-800
                    rounded-2xl p-8 border border-gray-100 dark:border-navy-700
                    hover:shadow-brand-lg transition-all duration-500 hover:-translate-y-1`}
                >
                  <div className="flex items-start gap-5">
                    <div className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center
                      transition-all duration-300 group-hover:scale-110 ${
                        isOrange
                          ? 'bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white'
                          : 'bg-electric-500/10 text-electric-500 group-hover:bg-electric-500 group-hover:text-white'
                      }`}>
                      <Icon size={30} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-poppins font-bold text-xl text-navy dark:text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="font-inter text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                        {service.desc}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((f, j) => (
                          <li key={j} className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0
                              ${isOrange ? 'bg-brand-orange/10' : 'bg-electric-500/10'}`}>
                              <Check size={10} className={isOrange ? 'text-brand-orange' : 'text-electric-500'} />
                            </div>
                            <span className="font-inter text-sm text-gray-600 dark:text-gray-300">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
