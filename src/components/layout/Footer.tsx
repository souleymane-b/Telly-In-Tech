import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter, Instagram, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import PixelPattern from '@/components/ui/PixelPattern';

export default function Footer() {
  const { t } = useLanguage();

  const services = [
    t.services.web.title,
    t.services.mobile.title,
    t.services.marketing.title,
    t.services.conseil.title,
    t.services.formation.title,
    t.services.cyber.title,
  ];

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/services', label: t.nav.services },
    { to: '/projets', label: t.nav.projects },
    { to: '/a-propos', label: t.nav.about },
    { to: '/contact', label: t.nav.contact },
  ];

  return (
    <footer className="relative bg-navy-900 dark:bg-black text-white overflow-hidden">
      <PixelPattern dark opacity={0.25} />

      {/* Top CTA banner */}
      <div className="relative z-10 bg-gradient-to-r from-brand-orange to-brand-orange-dark py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-poppins font-bold text-2xl md:text-3xl text-white mb-1">
              Prêt à transformer votre présence digitale ?
            </h3>
            <p className="font-inter text-white/80 text-sm">
              Parlons de votre projet dès aujourd'hui.
            </p>
          </div>
          <Link
            to="/contact"
            className="flex-shrink-0 flex items-center gap-2 bg-white text-brand-orange font-poppins
              font-bold px-7 py-3.5 rounded-full hover:shadow-lg transition-all duration-300
              hover:-translate-y-0.5 text-sm"
          >
            {t.nav.cta}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <img src="/Logo_Telly_InTech.svg" alt="Telly InTech" className="h-28 w-auto mb-4 brightness-0 invert" />
            <p className="font-inter text-sm text-gray-400 leading-relaxed mb-5">
              {t.footer.description}
            </p>
            <p className="font-poppins font-semibold text-brand-orange text-sm italic">
              "{t.footer.tagline}"
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Instagram, href: '#', label: 'Instagram' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-orange flex items-center
                    justify-center transition-colors duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-poppins font-semibold text-white text-sm uppercase tracking-widest mb-5">
              {t.footer.links}
            </h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-inter text-sm text-gray-400 hover:text-brand-orange
                      transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange/50 group-hover:bg-brand-orange
                      transition-colors flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-poppins font-semibold text-white text-sm uppercase tracking-widest mb-5">
              {t.footer.services_title}
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="font-inter text-sm text-gray-400 hover:text-brand-orange
                      transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-500/50 group-hover:bg-electric-500
                      transition-colors flex-shrink-0" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-poppins font-semibold text-white text-sm uppercase tracking-widest mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center
                  justify-center flex-shrink-0 mt-0.5">
                  <Mail size={14} className="text-brand-orange" />
                </div>
                <div>
                  <p className="font-inter text-xs text-gray-500 mb-0.5">{t.contact.email_label}</p>
                  <a href="mailto:contact@tellyintech.com"
                    className="font-inter text-sm text-gray-300 hover:text-brand-orange transition-colors">
                    contact@tellyintech.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-electric-500/10 flex items-center
                  justify-center flex-shrink-0 mt-0.5">
                  <Phone size={14} className="text-electric-500" />
                </div>
                <div>
                  <p className="font-inter text-xs text-gray-500 mb-0.5">{t.contact.phone_label}</p>
                  <a href="tel:+224000000000"
                    className="font-inter text-sm text-gray-300 hover:text-brand-orange transition-colors">
                    +224 620 00 00 00
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center
                  justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} className="text-gray-400" />
                </div>
                <div>
                  <p className="font-inter text-xs text-gray-500 mb-0.5">{t.contact.location_label}</p>
                  <p className="font-inter text-sm text-gray-300">
                    Dakar, Sénégal<br />Conakry, Guinée
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row
          items-center justify-between gap-3">
          <p className="font-inter text-xs text-gray-500">
            © {new Date().getFullYear()} Telly InTech. {t.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <Link to="/mentions-legales" className="font-inter text-xs text-gray-500 hover:text-gray-300 transition-colors">
              {t.footer.legal}
            </Link>
            <Link to="/confidentialite" className="font-inter text-xs text-gray-500 hover:text-gray-300 transition-colors">
              {t.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
