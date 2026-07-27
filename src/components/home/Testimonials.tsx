import { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  message: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Aissatou Barry',
    role: 'Directrice',
    company: 'ONG Femme Active',
    message: 'Telly InTech a transformé notre présence en ligne. Le site web qu\'ils ont créé nous a permis de toucher de nouveaux donateurs et partenaires. Un travail professionnel et adapté à nos moyens.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
  },
  {
    id: 2,
    name: 'Mamadou Diallo',
    role: 'CEO',
    company: 'DialloTech SARL',
    message: 'Une équipe à l\'écoute, réactive et très compétente. Notre application mobile a été livrée dans les délais avec une qualité irréprochable. Je recommande vivement Telly InTech.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
  },
  {
    id: 3,
    name: 'Fatoumata Cissé',
    role: 'Responsable Marketing',
    company: 'Conakry Foods',
    message: 'Grâce à leur stratégie digitale, nos ventes en ligne ont augmenté de 40% en trois mois. Leur approche locale et leur compréhension du marché guinéen font toute la différence.',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
  },
  {
    id: 4,
    name: 'Ousmane Camara',
    role: 'Président',
    company: 'Coopérative Agricole de Kankan',
    message: 'Telly InTech nous a accompagnés dans la digitalisation de notre coopérative. Formation, support et suivi exemplaires. Nos membres peuvent désormais gérer leurs ventes en ligne.',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
  },
];

export default function Testimonials() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();
  const [active, setActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const next = () => { setActive((active + 1) % testimonials.length); setAutoPlay(false); };
  const prev = () => { setActive((active - 1 + testimonials.length) % testimonials.length); setAutoPlay(false); };

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-20 md:py-28 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-navy-800 dark:to-navy-900 overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-brand-orange/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-electric-500/5 rounded-full blur-3xl animate-float-slow" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-on-scroll">
          <SectionHeader
            subtitle={t.testimonials.subtitle}
            title={t.testimonials.title}
          />
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto animate-on-scroll delay-100">
          <div className="relative">
            {/* Quote icon */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-brand-orange to-brand-orange-dark
              rounded-full flex items-center justify-center shadow-glow-orange z-10 animate-glow-pulse">
              <Quote size={24} className="text-white" />
            </div>

            {/* Card with glassmorphism */}
            <div className="glass-dark dark:glass rounded-2xl p-8 md:p-12 text-center
              relative overflow-hidden min-h-[320px]">
              {/* Background pattern */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-orange/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-electric-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              {/* Content with transition */}
              <div key={active} className="relative z-10 animate-scale-in">
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                    <Star key={i} size={18} className={`fill-brand-orange text-brand-orange animate-fade-up animation-delay-${(i + 1) * 100}`} />
                  ))}
                </div>

                {/* Message */}
                <p className="font-inter text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed
                  mb-8 italic animate-fade-up animation-delay-200">
                  "{testimonials[active].message}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-center gap-4 animate-fade-up animation-delay-400">
                  <img
                    src={testimonials[active].avatar}
                    alt={testimonials[active].name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-brand-orange/30"
                  />
                  <div className="text-left">
                    <p className="font-poppins font-bold text-navy dark:text-white">
                      {testimonials[active].name}
                    </p>
                    <p className="font-inter text-sm text-gray-500 dark:text-gray-400">
                      {testimonials[active].role} · {testimonials[active].company}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-white dark:bg-navy-700 shadow-brand flex items-center
                  justify-center text-navy dark:text-white hover:bg-brand-orange hover:text-white
                  transition-all duration-300 hover:scale-110"
                aria-label="Précédent"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setActive(i); setAutoPlay(false); }}
                    className={`h-2 rounded-full transition-all duration-300
                      ${i === active ? 'w-8 bg-brand-orange' : 'w-2 bg-gray-300 dark:bg-navy-600 hover:bg-gray-400'}`}
                    aria-label={`Témoignage ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-white dark:bg-navy-700 shadow-brand flex items-center
                  justify-center text-navy dark:text-white hover:bg-brand-orange hover:text-white
                  transition-all duration-300 hover:scale-110"
                aria-label="Suivant"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
