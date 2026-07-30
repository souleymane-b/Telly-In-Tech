import { Linkedin, Twitter, Mail } from 'lucide-react';

const colors = {
  navy: '#0B1B3A',
  slate: '#5B6478',
  orange: '#F6821F',
  orangeSoft: '#FDECDA',
  electric: '#2F6FED',
  electricSoft: '#E8F0FE',
  cardBg: '#F2F2F0',
};

const team = [
  {
    name: 'Alpha Missibaw Diallo',
    role: 'Co-founder & CEO',
    badge: 'Fondateur',
    bio: [
      "Visionnaire et stratège, Alpha pilote la direction de Telly InTech avec une conviction profonde : le numérique peut transformer la Guinée.",
      "Il orchestre la croissance, les partenariats et la mission de l'entreprise.",
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
      "Architecte technique et bâtisseur, Moussa conçoit les infrastructures robustes qui soutiennent chaque projet.",
      "De l'architecture cloud à la sécurité, il veille à l'excellence technique.",
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
      "Développeur passionné et méticuleux, Souleymane transforme les idées en applications fonctionnelles.",
      "Du front-end au back-end, il code avec précision et veille à la performance.",
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
      "Créative et empathique, Maimouna façonne des expériences numériques qui parlent aux utilisateurs.",
      "Elle marie esthétique, ergonomie et identité de marque dans chaque interface.",
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
      "Stratège de croissance, Mariama Hélène propulse la visibilité de Telly InTech et de ses clients.",
      "Elle analyse, teste et optimise pour transformer chaque visiteur en opportunité.",
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
      "Voix de Telly InTech, Adama veille à l'image et au récit de l'entreprise.",
      "Elle tisse des liens avec les médias, les partenaires et la communauté pour rayonner au-delà du digital.",
    ],
    photo: 'logo-s.png',
    socials: { linkedin: '#', twitter: '#', email: 'adama@tellyintech.com' },
    accent: 'electric',
  },
];

function initials(name) {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('');
}

function MemberCard({ member }) {
  const isOrange = member.accent === 'orange';
  const main = isOrange ? colors.orange : colors.electric;
  const soft = isOrange ? colors.orangeSoft : colors.electricSoft;

  return (
    <div
      className="rounded-3xl p-6 md:p-10"
      style={{ background: colors.cardBg }}
    >
      <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start">
        {/* Photo */}
        <div
          className="w-full md:w-48 h-56 md:h-56 flex-shrink-0 rounded-2xl overflow-hidden bg-white flex items-center justify-center"
          style={{ boxShadow: '0 6px 24px rgba(11,27,58,0.10)', border: '4px solid #fff' }}
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
            style={{ display: 'none', background: soft, color: main, fontFamily: 'Poppins, sans-serif' }}
          >
            {initials(member.name)}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <span
            className="inline-block text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-4"
            style={{ background: main, color: '#fff', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.06em' }}
          >
            {member.badge}
          </span>

          <h3
            className="font-bold text-2xl md:text-3xl mb-1"
            style={{ color: colors.navy, fontFamily: 'Poppins, sans-serif' }}
          >
            {member.name}
          </h3>
          <p className="font-semibold text-base mb-4" style={{ color: main }}>
            {member.role}
          </p>

          <div className="space-y-2 mb-6">
            {member.bio.map((line, i) => (
              <p key={i} className="text-[15px] leading-relaxed" style={{ color: colors.slate }}>
                {line}
              </p>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {member.socials.linkedin && (
              <a
                href={member.socials.linkedin}
                className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-xl text-white transition-transform hover:scale-105"
                style={{ background: main, fontFamily: 'Poppins, sans-serif' }}
              >
                <Linkedin size={16} /> Contacter sur LinkedIn
              </a>
            )}
            {member.socials.twitter && member.socials.twitter !== '#' && (
              <a
                href={member.socials.twitter}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ background: '#fff', color: colors.slate }}
              >
                <Twitter size={16} />
              </a>
            )}
            {member.socials.email && (
              <a
                href={`mailto:${member.socials.email}`}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ background: '#fff', color: colors.slate }}
              >
                <Mail size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section className="py-24" style={{ background: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
      `}</style>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <p
            className="text-xs font-semibold uppercase mb-3"
            style={{ color: colors.orange, letterSpacing: '0.25em' }}
          >
            L'équipe
          </p>
          <h2
            className="font-bold text-3xl md:text-4xl"
            style={{ color: colors.navy, fontFamily: 'Poppins, sans-serif' }}
          >
            Nos fondateurs
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          {team.map((member, i) => (
            <MemberCard key={i} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}