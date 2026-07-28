import { useState } from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import SectionHeader from '@/components/ui/SectionHeader';

interface Member {
  name: string;
  role: string;
  bio: string;
  bioEn: string;
  expertise: string[];
  expertiseEn: string[];
  photo: string;
  socials: { linkedin?: string; twitter?: string; email?: string };
  accent: 'orange' | 'electric';
}

const team: Member[] = [
  {
    name: 'Alpha Missibaw Diallo',
    role: 'Co-founder & CEO',
    bio: "Visionnaire et stratège, Alpha pilote la direction de Telly InTech avec une conviction profonde : le numérique peut transformer la Guinée. Il orchestre la croissance, les partenariats et la mission de l'entreprise.",
    bioEn: "Visionary and strategist, Alpha steers Telly InTech with a deep conviction: digital technology can transform Guinea. He orchestrates growth, partnerships and the company's mission.",
    expertise: ['Stratégie', 'Leadership', 'Partenariats'],
    expertiseEn: ['Strategy', 'Leadership', 'Partnerships'],
    photo: 'https://media.licdn.com/dms/image/v2/D4E03AQEzmlhIIParuQ/profile-displayphoto-shrink_800_800/B4EZUzNs4tHMAk-/0/1740320985239?e=1786579200&v=beta&t=JgOi_T2_b3vaHvJNCJ5_igY1cU-j-77WMtztjBZBGP0',
    socials: { linkedin: '#', twitter: '#', email: 'alpha@tellyintech.com' },
    accent: 'orange',
  },
  {
    name: 'Moussa Basse',
    role: 'Co-founder & CTO',
    bio: "Architecte technique et bâtisseur, Moussa conçoit les infrastructures robustes qui soutiennent chaque projet. De l'architecture cloud à la sécurité, il veille à l'excellence technique.",
    bioEn: "Technical architect and builder, Moussa designs the robust infrastructures behind every project. From cloud architecture to security, he ensures technical excellence.",
    expertise: ['Architecture', 'Cloud', 'Sécurité'],
    expertiseEn: ['Architecture', 'Cloud', 'Security'],
    photo: 'https://media.licdn.com/dms/image/v2/D4E03AQGwMwepFDX5Gw/profile-displayphoto-crop_800_800/B4EZhHd_DSHoAI-/0/1753545700204?e=1786579200&v=beta&t=Q1e3wgsnuuJyAgVmaLoKfUf7PyK8lQZ-i54GOYzArN4',
    socials: { linkedin: '#', twitter: '#', email: 'moussa@tellyintech.com' },
    accent: 'electric',
  },
  {
    name: 'Souleymane Ndiaye',
    role: 'Lead Full-Stack Developer',
    bio: "Développeur passionné et méticuleux, Souleymane transforme les idées en applications fonctionnelles. Du front-end au back-end, il code avec précision et veille à la performance.",
    bioEn: "Passionate and meticulous developer, Souleymane turns ideas into functional applications. From front-end to back-end, he codes with precision and ensures performance.",
    expertise: ['React', 'Node.js', 'APIs'],
    expertiseEn: ['React', 'Node.js', 'APIs'],
    photo: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600',
    socials: { linkedin: '#', twitter: '#', email: 'souleymane@tellyintech.com' },
    accent: 'orange',
  },
  {
    name: 'Maimouna Faye Guene',
    role: 'UX/UI & Product Designer',
    bio: "Créative et empathique, Maimouna façonne des expériences numériques qui parlent aux utilisateurs. Elle marie esthétique, ergonomie et identité de marque dans chaque interface.",
    bioEn: "Creative and empathetic, Maimouna crafts digital experiences that speak to users. She blends aesthetics, ergonomics and brand identity in every interface.",
    expertise: ['UX Design', 'UI Design', 'Branding'],
    expertiseEn: ['UX Design', 'UI Design', 'Branding'],
    photo: 'https://media.licdn.com/dms/image/v2/D4E03AQFBWpDmQf5sqA/profile-displayphoto-shrink_800_800/B4EZgTuQk.H4Ag-/0/1752677550889?e=1786579200&v=beta&t=1STqEoKSiJqWNmzpgf9zvq1sxtO3es4nTbYn_vtpmPg',
    socials: { linkedin: '#', twitter: '#', email: 'maimouna@tellyintech.com' },
    accent: 'electric',
  },
  {
    name: 'Mariama Hélène Ndong',
    role: 'Marketing & Growth Manager',
    bio: "Stratège de croissance, Mariama Hélène propulse la visibilité de Telly InTech et de ses clients. Elle analyse, teste et optimise pour transformer chaque visiteur en opportunité.",
    bioEn: "Growth strategist, Mariama Hélène propels Telly InTech's visibility and that of its clients. She analyzes, tests and optimizes to turn every visitor into an opportunity.",
    expertise: ['Growth', 'SEO', 'Analytics'],
    expertiseEn: ['Growth', 'SEO', 'Analytics'],
    photo: 'https://media.licdn.com/dms/image/v2/D4D03AQGV30c9NygBaQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1725397298147?e=1786579200&v=beta&t=cR6beJYCo3zCZC7pqIunmgiWwN6zxmKeYgXGC0y6-DA',
    socials: { linkedin: '#', twitter: '#', email: 'mariama@tellyintech.com' },
    accent: 'orange',
  },
  {
    name: 'Adama Telly Bah',
    role: 'Communications & PR Manager',
    bio: "Voix de Telly InTech, Adama veille à l'image et au récit de l'entreprise. Elle tisse des liens avec les médias, les partenaires et la communauté pour rayonner au-delà du digital.",
    bioEn: "Voice of Telly InTech, Adama ensures the company's image and narrative. She builds connections with media, partners and the community to shine beyond digital.",
    expertise: ['Communication', 'Relations Publiques', 'Médias'],
    expertiseEn: ['Communication', 'PR', 'Media'],
    photo: 'https://images.pexels.com/photos/3778680/pexels-photo-3778680.jpeg?auto=compress&cs=tinysrgb&w=600',
    socials: { linkedin: '#', twitter: '#', email: 'adama@tellyintech.com' },
    accent: 'electric',
  },
];

export default function Team() {
  const { t, lang } = useLanguage();
  const sectionRef = useScrollAnimation();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative bg-white dark:bg-navy-900 py-24 overflow-hidden">

      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                            linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle={t.team.subtitle}
          title={t.team.title}
          description={t.team.description}
        />

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, i) => {
            const isOrange = member.accent === 'orange';
            const isHovered = hovered === i;

            return (
              <div
                key={i}
                className={`animate-on-scroll-scale delay-${(i % 3) * 100} group`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="relative bg-white dark:bg-navy-800 rounded-2xl overflow-hidden
                  border border-gray-100 dark:border-navy-700
                  transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">

                  {/* Photo */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={member.photo}
                      alt={member.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700
                        group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent" />

                    {/* Expertise tags — reveal on hover */}
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5
                      transition-all duration-500"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                      }}>
                      {(lang === 'fr' ? member.expertise : member.expertiseEn).map((tag) => (
                        <span key={tag}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-inter font-medium
                            backdrop-blur-md border
                            ${isOrange
                              ? 'bg-brand-orange/20 text-brand-orange border-brand-orange/30'
                              : 'bg-electric-500/20 text-electric-500 border-electric-500/30'
                            }`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Accent bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 ${isOrange ? 'bg-brand-orange' : 'bg-electric-500'}
                      transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="font-poppins font-bold text-lg text-navy dark:text-white mb-1">
                      {member.name}
                    </h3>
                    <p className={`font-inter text-sm font-medium mb-3
                      ${isOrange ? 'text-brand-orange' : 'text-electric-500'}`}>
                      {member.role}
                    </p>
                    <p className="font-inter text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {lang === 'fr' ? member.bio : member.bioEn}
                    </p>

                    {/* Social links */}
                    <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100 dark:border-navy-700">
                      {member.socials.linkedin && (
                        <a href={member.socials.linkedin}
                          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-navy-700
                            flex items-center justify-center text-gray-500 dark:text-gray-400
                            hover:bg-brand-orange hover:text-white transition-all duration-300">
                          <Linkedin size={14} />
                        </a>
                      )}
                      {member.socials.twitter && (
                        <a href={member.socials.twitter}
                          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-navy-700
                            flex items-center justify-center text-gray-500 dark:text-gray-400
                            hover:bg-electric-500 hover:text-white transition-all duration-300">
                          <Twitter size={14} />
                        </a>
                      )}
                      {member.socials.email && (
                        <a href={`mailto:${member.socials.email}`}
                          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-navy-700
                            flex items-center justify-center text-gray-500 dark:text-gray-400
                            hover:bg-navy hover:text-white transition-all duration-300">
                          <Mail size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
