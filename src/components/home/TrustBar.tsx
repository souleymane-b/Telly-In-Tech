import { Star } from 'lucide-react';

const partners = ['Orange', 'MTN', 'Ecobank', 'UNICEF', 'Total', 'USAID'];

export default function TrustBar() {
  return (
    <div className="mt-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} className="fill-brand-orange text-brand-orange" />
          ))}
        </div>
        <div className="text-left">
          <div className="font-poppins font-bold text-sm text-white">4.9/5</div>
          <div className="font-inter text-[10px] text-white/50">+120 projets</div>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-px h-10 bg-white/10" />

      {/* Satisfaction */}
      <div className="text-left">
        <div className="font-poppins font-bold text-sm text-white">98%</div>
        <div className="font-inter text-[10px] text-white/50">Satisfaction</div>
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-px h-10 bg-white/10" />

      {/* Partners */}
      <div className="flex flex-col gap-1.5">
        <div className="font-inter text-[10px] text-white/50 uppercase tracking-wider">Ils nous font confiance</div>
        <div className="flex flex-wrap items-center gap-3">
          {partners.map((p) => (
            <span key={p} className="font-poppins font-semibold text-xs text-white/40 hover:text-white/80
              transition-colors duration-300 cursor-default">
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
