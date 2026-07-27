import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Marquee from '@/components/ui/Marquee';

const partners = [
  'Orange Guinée',
  'MTN Guinée',
  'Université de Conakry',
  'Ministère du Numérique',
  'Chambre de Commerce',
  'Startup Hub Dakar',
  'JumbaPay',
  'Agence de Développement',
];

export default function Partners() {
  const sectionRef = useScrollAnimation();

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-16 bg-white dark:bg-navy-900 overflow-hidden border-y border-gray-100 dark:border-navy-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <p className="text-center font-inter text-xs font-semibold tracking-[0.25em] uppercase
          text-gray-400 dark:text-gray-500 animate-on-scroll">
          Ils nous font confiance
        </p>
      </div>

      {/* Marquee row 1 */}
      <div className="overflow-hidden mb-4 animate-on-scroll delay-100">
        <Marquee>
          {partners.map((partner, i) => (
            <div key={i} className="flex items-center gap-12 pr-12">
              <span className="font-poppins font-bold text-lg text-gray-400 dark:text-gray-500
                hover:text-navy dark:hover:text-white transition-colors duration-300 cursor-default">
                {partner}
              </span>
              <span className="w-2 h-2 rounded-full bg-brand-orange/40" />
            </div>
          ))}
        </Marquee>
      </div>

      {/* Marquee row 2 (reverse) */}
      <div className="overflow-hidden animate-on-scroll delay-200">
        <Marquee reverse>
          {partners.slice().reverse().map((partner, i) => (
            <div key={i} className="flex items-center gap-12 pr-12">
              <span className="w-2 h-2 rounded-full bg-electric-500/40" />
              <span className="font-poppins font-bold text-lg text-gray-400 dark:text-gray-500
                hover:text-navy dark:hover:text-white transition-colors duration-300 cursor-default">
                {partner}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
