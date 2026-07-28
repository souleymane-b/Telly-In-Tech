import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import Magnetic from '@/components/ui/Magnetic';

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const { dark, toggleDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/services', label: t.nav.services },
    { to: '/projets', label: t.nav.projects },
    { to: '/a-propos', label: t.nav.about },
    { to: '/contact', label: t.nav.contact },
  ];

  const isTransparent = isHome && !scrolled && !menuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${isTransparent ? 'navbar-transparent' : 'navbar-solid'}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src="/logo-s.png"
              alt="Telly InTech"
              className="h-14 lg:h-20 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-inter font-medium text-sm transition-colors duration-200 relative group
                  ${location.pathname === link.to
                    ? 'text-brand-orange'
                    : 'text-white hover:text-brand-orange'
                  }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-orange transition-all duration-300
                  ${location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-inter
                font-medium transition-colors px-2 py-1 rounded hover:bg-white/10"
              aria-label="Changer de langue"
            >
              <Globe size={15} />
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>

            {/* Dark mode */}
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Changer de thème"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* CTA */}
            <Magnetic strength={0.2} className="ml-2">
              <Link
                to="/contact"
                className="btn-cta bg-brand-orange hover:bg-brand-orange-dark text-white
                  font-poppins font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-300
                  hover:shadow-orange hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden"
              >
                <span className="absolute inset-0 shimmer-bg opacity-0 hover:opacity-100" />
                <span className="relative z-10">{t.nav.cta}</span>
              </Link>
            </Magnetic>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="p-2 text-white/80 hover:text-white"
            >
              <Globe size={18} />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden
            ${menuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
        >
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-inter font-medium text-sm py-2.5 px-3 rounded-lg transition-colors
                  ${location.pathname === link.to
                    ? 'text-brand-orange bg-white/10'
                    : 'text-white hover:text-brand-orange hover:bg-white/10'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="mt-2 bg-brand-orange text-white font-poppins font-semibold text-sm
                px-5 py-3 rounded-full text-center transition-all duration-300 hover:bg-brand-orange-dark"
            >
              {t.nav.cta}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
