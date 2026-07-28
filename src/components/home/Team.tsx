import { Target, Eye, Heart, Check, MapPin, ArrowRight } from 'lucide-react';

const colors = {
  navy: '#0B1B3A',
  navySoft: '#1C3766',
  electric: '#2F6FED',
  electricSoft: '#E8F0FE',
  orange: '#F6821F',
  orangeSoft: '#FDECDA',
  cream: '#F7F7F5',
  ink: '#0B1B3A',
  slate: '#5B6478',
};

const pillars = [
  {
    icon: Target,
    title: 'Mission',
    text: "Accompagner la transformation digitale de la Guinée en combinant expertise technique, engagement social et ancrage profond dans les réalités locales.",
    accent: 'orange',
  },
  {
    icon: Eye,
    title: 'Vision',
    text: "Une Guinée où chaque entreprise, association et initiative citoyenne est visible, crédible et connectée au monde.",
    accent: 'electric',
  },
  {
    icon: Heart,
    title: 'Valeurs',
    text: "Qualité sans compromis, ancrage local profond, tarifs justes et adaptés à la réalité économique guinéenne.",
    accent: 'orange',
  },
];

const values = [
  'Qualité sans compromis',
  'Ancrage local profond',
  'Tarifs justes et adaptés',
  'Engagement social',
  'Innovation continue',
  'Transparence et confiance',
];

const team = [
  { initials: 'FT', role: 'Fondateur & Directeur' },
  { initials: 'DT', role: 'Responsable technique' },
  { initials: 'ES', role: "Chargée d'engagement social" },
  { initials: 'CR', role: 'Relation clients Guinée' },
];

function Pillar({ icon: Icon, title, text, accent }) {
  const isOrange = accent === 'orange';
  const main = isOrange ? colors.orange : colors.electric;
  const soft = isOrange ? colors.orangeSoft : colors.electricSoft;
  return (
    <div
      className="group rounded-2xl p-8 text-center transition-all duration-500 hover:-translate-y-1"
      style={{ background: '#fff', border: '1px solid #ECEAE3' }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:scale-110"
        style={{ background: soft, color: main }}
      >
        <Icon size={28} strokeWidth={2} />
      </div>
      <h3 className="font-bold text-xl mb-3" style={{ color: colors.ink, fontFamily: 'Poppins, sans-serif' }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: colors.slate }}>
        {text}
      </p>
    </div>
  );
}

export default function About() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: colors.cream }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;900&family=Inter:wght@400;500;600&display=swap');
      `}</style>

      {/* Hero */}
      <section
        className="relative pt-28 pb-24 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${colors.navy} 0%, ${colors.navySoft} 60%, ${colors.electric} 130%)` }}
      >
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
            backgroundSize: '18px 18px',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p
            className="text-xs font-semibold uppercase mb-4"
            style={{ color: colors.orange, letterSpacing: '0.25em' }}
          >
            Qui sommes-nous
          </p>
          <h1
            className="font-black text-4xl md:text-6xl text-white mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            À propos de Telly InTech
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Une structure sociale et solidaire née à Dakar, au service de la transformation digitale guinéenne.
          </p>
        </div>

        {/* Journey signature: Dakar -> Guinée */}
        <div className="relative z-10 max-w-lg mx-auto mt-14 px-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: colors.orange, boxShadow: `0 0 0 4px ${colors.orange}33` }}
              />
              <span className="text-white text-sm font-medium flex items-center gap-1">
                <MapPin size={14} /> Dakar
              </span>
              <span className="text-white/50 text-xs">Naissance du projet</span>
            </div>

            <svg width="140" height="16" viewBox="0 0 140 16" className="mx-2 flex-shrink-0">
              <line x1="0" y1="8" x2="140" y2="8" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 5" />
              <polygon points="132,3 140,8 132,13" fill="#fff" opacity="0.55" />
            </svg>

            <div className="flex flex-col items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: colors.electric, boxShadow: `0 0 0 4px ${colors.electric}33` }}
              />
              <span className="text-white text-sm font-medium flex items-center gap-1">
                <MapPin size={14} /> Guinée
              </span>
              <span className="text-white/50 text-xs">Terrain d'action</span>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20" style={{ background: '#fff' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-lg md:text-xl leading-relaxed" style={{ color: colors.slate }}>
            Telly InTech est une structure sociale et solidaire spécialisée dans la transformation digitale.
            Née à Dakar d'une vision portée par un jeune Sénégalo-Guinéen, elle a l'ambition de mettre ses
            compétences au service de la Guinée en combinant expertise technique, sens du terrain et
            engagement social.
          </p>
        </div>
      </section>

      {/* Mission / Vision / Valeurs */}
      <section className="py-24" style={{ background: colors.cream }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p, i) => (
              <Pillar key={i} {...p} />
            ))}
          </div>

          {/* Values */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h3
              className="font-bold text-2xl text-center mb-10"
              style={{ color: colors.ink, fontFamily: 'Poppins, sans-serif' }}
            >
              Nos valeurs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl p-4"
                  style={{ background: '#fff', border: '1px solid #ECEAE3' }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: colors.orangeSoft }}
                  >
                    <Check size={16} style={{ color: colors.orange }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: colors.ink }}>
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24" style={{ background: '#fff' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p
              className="text-xs font-semibold uppercase mb-3"
              style={{ color: colors.electric, letterSpacing: '0.25em' }}
            >
              L'équipe
            </p>
            <h3
              className="font-bold text-2xl md:text-3xl"
              style={{ color: colors.ink, fontFamily: 'Poppins, sans-serif' }}
            >
              Des personnes engagées sur le terrain
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <div key={i} className="text-center">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center font-bold"
                  style={{
                    background: i % 2 === 0 ? colors.orangeSoft : colors.electricSoft,
                    color: i % 2 === 0 ? colors.orange : colors.electric,
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  {m.initials}
                </div>
                <p className="text-sm font-medium" style={{ color: colors.ink }}>
                  {m.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 text-center"
        style={{ background: `linear-gradient(135deg, ${colors.navy}, ${colors.navySoft})` }}
      >
        <div className="max-w-2xl mx-auto px-6">
          <h3
            className="font-bold text-2xl md:text-3xl text-white mb-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Prêt à transformer votre présence digitale ?
          </h3>
          <p className="text-white/70 mb-8">
            Parlons de votre projet et voyons comment nous pouvons vous accompagner.
          </p>
          <button
            className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition-transform hover:scale-105"
            style={{ background: colors.orange, color: '#fff', fontFamily: 'Poppins, sans-serif' }}
          >
            Contactez-nous <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}