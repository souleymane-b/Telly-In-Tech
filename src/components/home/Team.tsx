import { Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useState } from 'react';
const colors = {
  navy: '#0B1B3A',
  slate: '#5B6478',
  orange: '#F6821F',
  orangeSoft: '#FDECDA',
  electric: '#2F6FED',
  electricSoft: '#E8F0FE',
  line: '#E7E5DF',
  cream: '#FAFAF8',
};

const team = [
  {
    name: 'Alpha Missibaw Diallo',
    role: 'Co-founder & CEO',
    badge: 'Fondateur',
    bio: "Visionnaire et stratège, Alpha pilote la direction de Telly InTech avec une conviction profonde : le numérique peut transformer la Guinée. Il orchestre la croissance, les partenariats et la mission de l'entreprise.",
    bioEn: "Visionary and strategist, Alpha leads Telly InTech with a deep conviction: digital can transform Guinea. He orchestrates growth, partnerships, and the mission of the company.",
    expertise: ['Stratégie', 'Leadership', 'Partenariats'],
    expertiseEn: ['Strategy', 'Leadership', 'Partnerships'],
    photo: 'team/alpha.png',
    socials: { linkedin: 'https://www.linkedin.com/in/alpha-missibaw-diallo-6950ba204/', twitter: '#', email: 'alpha@tellyintech.com' },
    accent: 'orange',
  },
  {
    name: 'Moussa Basse',
    role: 'Co-founder & CTO',
    badge: 'Cofondateur',
    bio: "Architecte technique et bâtisseur, Moussa conçoit les infrastructures robustes qui soutiennent chaque projet. De l'architecture cloud à la sécurité, il veille à l'excellence technique.",
    bioEn: "Technical architect and builder, Moussa designs robust infrastructure that supports each project. From cloud architecture to security, he ensures technical excellence.",
    expertise: ['Architecture', 'Cloud', 'Sécurité'],
    expertiseEn: ['Architecture', 'Cloud', 'Security'],
    photo: 'team/mousa.png',
    socials: { linkedin: 'https://www.linkedin.com/in/moussa-basse-86602b204/', twitter: '#', email: 'moussa@tellyintech.com' },
    accent: 'electric',
  },
  {
    name: 'Souleymane Ndiaye',
    role: 'Lead Full-Stack Developer',
    badge: 'Développeur',
    bio: "Développeur passionné et méticuleux, Souleymane transforme les idées en applications fonctionnelles. Du front-end au back-end, il code avec précision et veille à la performance.",
    bioEn: "Passionate and meticulous, Souleymane transforms ideas into functional applications. From front-end to back-end, he codes with precision and ensures performance.",
    expertise: ['Front-end', 'Back-end', 'DevOps'],
    expertiseEn: ['Front-end', 'Back-end', 'DevOps'],
    photo: 'team/souleymane.png',
    socials: { linkedin: '#', twitter: '#', email: 'souleymane@tellyintech.com' },
    accent: 'orange',
  },
  {
    name: 'Maimouna Faye Guene',
    role: 'UX/UI & Product Designer',
    badge: 'Designer',
    bio: "Créative et empathique, Maimouna façonne des expériences numériques qui parlent aux utilisateurs. Elle marie esthétique, ergonomie et identité de marque dans chaque interface.",
    bioEn: "Creative and empathetic, Maimouna shapes digital experiences that speak to users. She marries aesthetics, ergonomics, and brand identity in each interface.",
    expertise: ['UX Design', 'UI Design', 'Branding'],
    expertiseEn: ['UX Design', 'UI Design', 'Branding'],
    photo: 'team/maimouna.jpg',
    socials: { linkedin: '#', twitter: '#', email: 'maimouna@tellyintech.com' },
    accent: 'electric',
  },
  {
    name: 'Mariama Hélène Ndong',
    role: 'Marketing & Growth Manager',
    badge: 'Growth',
    bio: "Stratège de croissance, Mariama Hélène propulse la visibilité de Telly InTech et de ses clients. Elle analyse, teste et optimise pour transformer chaque visiteur en opportunité.",
    bioEn: "Growth strategist, Mariama Hélène propels the visibility of Telly InTech and its clients. She analyzes, tests, and optimizes to transform each visitor into an opportunity.",
    expertise: ['Growth', 'SEO', 'Analytics'],
    expertiseEn: ['Growth', 'SEO', 'Analytics'],
    photo: 'team/mariama.jpg',
    socials: { linkedin: '#', twitter: '#', email: 'mariama@tellyintech.com' },
    accent: 'orange',
  },
  {
    name: 'Adama Telly Bah',
    role: 'Communications & PR Manager',
    badge: 'Communication',
    bio: "Voix de Telly InTech, Adama veille à l'image et au récit de l'entreprise. Elle tisse des liens avec les médias, les partenaires et la communauté pour rayonner au-delà du digital.",
    bioEn: "Voice of Telly InTech, Adama ensures the image and story of the company. She builds relationships with media, partners, and the community to radiate beyond digital.",
    expertise: ['Communication', 'Relations Publiques', 'Médias'],
    expertiseEn: ['Communication', 'Public Relations', 'Medias'],
    photo: 'logo-s.png',
    socials: { linkedin: '#', twitter: '#', email: 'adama@tellyintech.com' },
    accent: 'electric',
  },
];

function initials(name) {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('');
}

function MemberRow({ member, index }) {
  const isOrange = member.accent === 'orange';
  const main = isOrange ? colors.orange : colors.electric;
  const soft = isOrange ? colors.orangeSoft : colors.electricSoft;
  const reversed = index % 2 === 1;
  const num = String(index + 1).padStart(2, '0');
  const { lang } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={`relative flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-16 py-14`}
      style={{ borderBottom: `1px solid ${colors.line}` }}
    >
      {/* Background number watermark */}
      <span
        className="hidden md:block absolute top-4 select-none"
        style={{
          [reversed ? 'left' : 'right']: '0',
          fontSize: '120px',
          fontWeight: 800,
          color: soft,
          fontFamily: 'Poppins, sans-serif',
          lineHeight: 1,
          zIndex: 0,
        }}
      >
        {num}
      </span>

      {/* Photo */}
      <div className="relative flex-shrink-0 z-10">
        <div
          className="w-40 h-40 md:w-56 md:h-56 rounded-full p-1.5"
          style={{ background: `linear-gradient(135deg, ${main}, ${colors.navy})` }}
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'flex';
              }}
            />
            <div
              className="w-full h-full items-center justify-center font-bold text-3xl"
              style={{ display: 'none', background: soft, color: main, fontFamily: 'Poppins, sans-serif' }}
            >
              {initials(member.name)}
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className={`flex-1 z-10 ${reversed ? 'md:text-right' : ''}`}>
        <span
          className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase px-3 py-1 rounded-full mb-4"
          style={{ background: soft, color: main, fontFamily: 'Poppins, sans-serif', letterSpacing: '0.06em' }}
        >
          {member.badge}
        </span>

        <h3
          className="font-bold text-2xl md:text-4xl mb-1"
          style={{ color: colors.navy, fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.01em' }}
        >
          {member.name}
        </h3>
        <p className="font-semibold text-base mb-4" style={{ color: main }}>
          {member.role}
        </p>

        <p className="text-[15px] leading-relaxed max-w-lg mb-5" style={{ color: colors.slate, marginLeft: reversed ? 'auto' : 0 }}>
          {lang === 'fr' ? member.bio : member.bioEn}
        </p>

        <div className={`flex flex-wrap gap-2 mb-6 ${reversed ? 'md:justify-end' : ''}`}>
          {member.expertise.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{ border: `1px solid ${colors.line}`, color: colors.slate }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className={`flex items-center gap-3 ${reversed ? 'md:justify-end' : ''}`}>
          {member.socials.linkedin && (
            <a
              href={member.socials.linkedin}
              className="inline-flex items-center gap-1.5 font-semibold text-sm px-4 py-2 rounded-full transition-transform hover:scale-105"
              style={{ background: colors.navy, color: '#fff', fontFamily: 'Poppins, sans-serif' }}
            >
              <Linkedin size={15} /> LinkedIn <ArrowUpRight size={14} />
            </a>
          )}
          {member.socials.twitter && member.socials.twitter !== '#' && (
            <a
              href={member.socials.twitter}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{ border: `1px solid ${colors.line}`, color: colors.slate }}
            >
              <Twitter size={15} />
            </a>
          )}
          {member.socials.email && (
            <a
              href={`mailto:${member.socials.email}`}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{ border: `1px solid ${colors.line}`, color: colors.slate }}
            >
              <Mail size={15} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section className="py-24" style={{ background: colors.cream, fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap');
      `}</style>
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-end justify-between mb-4 flex-wrap gap-4">
          <div>
            <p
              className="text-xs font-semibold uppercase mb-3"
              style={{ color: colors.orange, letterSpacing: '0.25em' }}
            >
              L'équipe
            </p>
            <h2
              className="font-bold text-3xl md:text-5xl"
              style={{ color: colors.navy, fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.02em' }}
            >
              Nos fondateurs
            </h2>
          </div>
          <p className="text-sm max-w-xs" style={{ color: colors.slate }}>
            Les personnes qui construisent Telly InTech, du code au terrain.
          </p>
        </div>

        <div>
          {team.map((member, i) => (
            <MemberRow key={i} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}