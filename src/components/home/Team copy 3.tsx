import { Linkedin, Twitter, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const colors = {
  navy: '#0B1B3A',
  slate: '#5B6478',
  orange: '#F6821F',
  orangeSoft: '#FDECDA',
  electric: '#2F6FED',
  electricSoft: '#E8F0FE',
  paper: '#FAFAF8',
};

const team = [
  {
    name: 'Alpha Missibaw Diallo',
    role: 'Co-founder & CEO',
    badge: 'Fondateur',
    bio: [
      "Visionnaire et stratège, Alpha pilote la direction de Telly InTech avec une conviction profonde : le numérique peut transformer la Guinée. Il orchestre la croissance, les partenariats et la mission de l'entreprise.",
    ],
    photo: 'team/alpha.png',
    socials: { linkedin: 'https://www.linkedin.com/in/alpha-missibaw-diallo-6950ba204/', twitter: '#', email: 'alpha@tellyintech.com' },
    accent: 'orange',
  },
  {
    name: 'Moussa Basse',
    role: 'Co-founder & CTO',
    badge: 'Cofondateur',
    bio: [
      "Architecte technique et bâtisseur, Moussa conçoit les infrastructures robustes qui soutiennent chaque projet. De l'architecture cloud à la sécurité, il veille à l'excellence technique.",
    ],
    photo: 'team/mousa.png',
    socials: { linkedin: 'https://www.linkedin.com/in/moussa-basse-86602b204/', twitter: '#', email: 'moussa@tellyintech.com' },
    accent: 'electric',
  },
  {
    name: 'Souleymane Ndiaye',
    role: 'Lead Full-Stack Developer',
    badge: 'Développeur',
    bio: [
      "Développeur passionné et méticuleux, Souleymane transforme les idées en applications fonctionnelles. Du front-end au back-end, il code avec précision et veille à la performance.",
    ],
    photo: 'team/souleymane.png',
    socials: { linkedin: '#', twitter: '#', email: 'souleymane@tellyintech.com' },
    accent: 'orange',
  },
  {
    name: 'Maimouna Faye Guene',
    role: 'UX/UI & Product Designer',
    badge: 'Designer',
    bio: [
      "Créative et empathique, Maimouna façonne des expériences numériques qui parlent aux utilisateurs. Elle marie esthétique, ergonomie et identité de marque dans chaque interface.",
    ],
    photo: 'team/maimouna.jpg',
    socials: { linkedin: '#', twitter: '#', email: 'maimouna@tellyintech.com' },
    accent: 'electric',
  },
  {
    name: 'Mariama Hélène Ndong',
    role: 'Marketing & Growth Manager',
    badge: 'Growth',
    bio: [
      "Stratège de croissance, Mariama Hélène propulse la visibilité de Telly InTech et de ses clients. Elle analyse, teste et optimise pour transformer chaque visiteur en opportunité.",
    ],
    photo: 'team/mariama.jpg',
    socials: { linkedin: '#', twitter: '#', email: 'mariama@tellyintech.com' },
    accent: 'orange',
  },
  {
    name: 'Adama Telly Bah',
    role: 'Communications & PR Manager',
    badge: 'Communication',
    bio: [
      "Voix de Telly InTech, Adama veille à l'image et au récit de l'entreprise. Elle tisse des liens avec les médias, les partenaires et la communauté pour rayonner au-delà du digital.",
    ],
    photo: 'logo-s.png',
    socials: { linkedin: '#', twitter: '#', email: 'adama@tellyintech.com' },
    accent: 'electric',
  },
];

function initials(name) {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('');
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Node({ main }) {
  return (
    <div className="relative hidden md:flex items-center justify-center w-5 h-5 shrink-0">
      <span
        className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-40"
        style={{ background: main }}
      />
      <span
        className="relative inline-flex rounded-full w-2.5 h-2.5 ring-4"
        style={{ background: main, boxShadow: `0 0 0 4px ${colors.paper}` }}
      />
    </div>
  );
}

function Photo({ member, main, soft }) {
  return (
    <div className="relative w-full max-w-[220px] mx-auto md:mx-0">
      <div
        className="absolute -inset-2 rounded-[28px] -z-0"
        style={{ background: soft, transform: 'rotate(-4deg)' }}
      />
      <div
        className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden bg-white z-10"
        style={{ boxShadow: '0 12px 32px rgba(11,27,58,0.14)', border: '3px solid #fff' }}
      >
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
          style={{ display: 'none', background: soft, color: main, fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {initials(member.name)}
        </div>
      </div>
    </div>
  );
}

function MemberRow({ member, index }) {
  const isOrange = member.accent === 'orange';
  const main = isOrange ? colors.orange : colors.electric;
  const soft = isOrange ? colors.orangeSoft : colors.electricSoft;
  const flip = index % 2 === 1;
  const [ref, visible] = useReveal();

  const InfoBlock = (
    <div className={`flex-1 min-w-0 ${flip ? 'md:text-right' : ''}`}>
      <span
        className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase px-3 py-1 rounded-full mb-4"
        style={{
          background: soft,
          color: main,
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: '0.14em',
        }}
      >
        {member.badge}
      </span>

      <h3
        className="font-bold text-2xl md:text-[28px] leading-tight mb-1"
        style={{ color: colors.navy, fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {member.name}
      </h3>
      <p
        className="font-medium text-[15px] mb-4"
        style={{ color: main, fontFamily: "'JetBrains Mono', monospace" }}
      >
        {member.role}
      </p>

      <div className="space-y-2 mb-6">
        {member.bio.map((line, i) => (
          <p key={i} className="text-[15px] leading-relaxed" style={{ color: colors.slate }}>
            {line}
          </p>
        ))}
      </div>

      <div className={`flex items-center gap-3 ${flip ? 'md:justify-end' : ''}`}>
        {member.socials.linkedin && (
          <a
            href={member.socials.linkedin}
            className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-xl text-white transition-transform hover:scale-105"
            style={{ background: main, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <Linkedin size={16} /> LinkedIn
          </a>
        )}
        {member.socials.twitter && member.socials.twitter !== '#' && (
          <a
            href={member.socials.twitter}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ background: colors.paper, color: colors.slate }}
          >
            <Twitter size={16} />
          </a>
        )}
        {member.socials.email && (
          <a
            href={`mailto:${member.socials.email}`}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ background: colors.paper, color: colors.slate }}
          >
            <Mail size={16} />
          </a>
        )}
      </div>
    </div>
  );

  const PhotoBlock = (
    <div className="w-full md:w-64 shrink-0">
      <Photo member={member} main={main} soft={soft} />
    </div>
  );

  return (
    <div
      ref={ref}
      className="relative transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      <div className={`flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-0 ${flip ? 'md:flex-row-reverse' : ''}`}>
        {flip ? PhotoBlock : PhotoBlock}
        <Node main={main} />
        {InfoBlock}
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: colors.paper, fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');
      `}</style>

      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="text-center mb-20">
          <p
            className="text-xs font-medium uppercase mb-3"
            style={{ color: colors.orange, letterSpacing: '0.3em', fontFamily: "'JetBrains Mono', monospace" }}
          >
            L'équipe
          </p>
          <h2
            className="font-bold text-3xl md:text-5xl"
            style={{ color: colors.navy, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Nos fondateurs
          </h2>
        </div>

        {/* Central connecting spine */}
        <div
          className="hidden md:block absolute top-32 bottom-10 left-1/2 w-px -translate-x-1/2"
          style={{ background: `linear-gradient(to bottom, ${colors.orange}, ${colors.electric})`, opacity: 0.25 }}
        />

        <div className="flex flex-col gap-16 md:gap-14 relative">
          {team.map((member, i) => (
            <MemberRow key={i} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}