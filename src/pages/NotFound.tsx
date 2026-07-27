import { Link } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';
import PixelPattern from '@/components/ui/PixelPattern';

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-navy overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-700 to-electric-700 opacity-95" />
      <PixelPattern dark opacity={0.25} />

      <div className="relative z-10 text-center px-4">
        <h1 className="font-poppins font-black text-7xl md:text-9xl text-gradient-orange mb-4">404</h1>
        <p className="font-poppins font-bold text-2xl md:text-3xl text-white mb-3">
          Page introuvable
        </p>
        <p className="font-inter text-base text-blue-100/70 max-w-md mx-auto mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white
            font-poppins font-semibold px-7 py-3.5 rounded-full transition-all duration-300
            hover:shadow-orange hover:-translate-y-0.5 text-sm"
        >
          <HomeIcon size={16} />
          Retour à l'accueil
        </Link>
      </div>
    </section>
  );
}
