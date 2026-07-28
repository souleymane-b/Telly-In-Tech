import { useEffect, useState, useRef } from 'react';
import { TrendingUp, Cpu, Activity } from 'lucide-react';

export default function HeroIllustration() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center min-h-[400px]">
      {/* ---- 3D Sphere ---- */}
      <div
        className="absolute top-4 right-4 w-24 h-24 pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <div className="relative w-full h-full">
          {/* Glow */}
          <div className="absolute inset-0 bg-brand-orange/30 rounded-full blur-2xl animate-glow-pulse" />
          {/* Sphere body */}
          <div className="relative w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), rgba(234,87,13,0.8) 40%, rgba(196,70,9,0.9) 100%)',
              boxShadow: 'inset -8px -8px 20px rgba(0,0,0,0.3), 0 10px 40px rgba(234,87,13,0.4)',
              animation: 'spin 20s linear infinite',
            }}
          >
            {/* Glass highlight */}
            <div className="absolute top-2 left-3 w-8 h-8 rounded-full bg-white/30 blur-md" />
          </div>
        </div>
      </div>

      {/* ---- Light lines (Vercel-style) ---- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-electric-500/20 to-transparent"
            style={{
              top: `${15 + i * 25}%`,
              left: '0',
              right: '0',
              animation: `shimmer ${4 + i}s linear infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* ---- Laptop ---- */}
      <div
        className="relative z-10"
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x * 8}deg) rotateX(${mousePos.y * -8}deg)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        {/* Screen */}
        <div className="relative w-72 h-44 bg-gradient-to-br from-navy-700 to-navy-800 rounded-t-xl
          border-2 border-navy-600 border-b-0 overflow-hidden shadow-2xl">
          {/* Screen content — mini dashboard */}
          <div className="p-3 h-full flex flex-col gap-2">
            {/* Top bar */}
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-400/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                <div className="w-2 h-2 rounded-full bg-green-400/60" />
              </div>
              <div className="font-inter text-[8px] text-white/40">telly-intech.gn</div>
            </div>

            {/* Dashboard cards */}
            <div className="grid grid-cols-2 gap-1.5 mt-1">
              <div className="bg-white/5 rounded-md p-1.5 border border-white/5">
                <div className="flex items-center gap-1">
                  <TrendingUp size={8} className="text-brand-orange" />
                  <span className="font-inter text-[7px] text-white/60">Performance</span>
                </div>
                <div className="font-poppins font-bold text-sm text-white mt-0.5">+40%</div>
                {/* Mini bar chart */}
                <div className="flex items-end gap-0.5 h-5 mt-1">
                  {[40, 60, 35, 80, 55, 90, 70].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-brand-orange/40 to-brand-orange rounded-sm"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="bg-white/5 rounded-md p-1.5 border border-white/5">
                <div className="flex items-center gap-1">
                  <Activity size={8} className="text-electric-500" />
                  <span className="font-inter text-[7px] text-white/60">Trafic</span>
                </div>
                <div className="font-poppins font-bold text-sm text-white mt-0.5">12.4k</div>
                {/* Mini line chart */}
                <svg viewBox="0 0 60 20" className="w-full h-5 mt-1">
                  <polyline
                    points="0,15 10,10 20,12 30,6 40,8 50,3 60,5"
                    fill="none"
                    stroke="#0c71b9"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="0,15 10,10 20,12 30,6 40,8 50,3 60,5"
                    fill="none"
                    stroke="rgba(12,113,185,0.2)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Bottom row */}
            <div className="bg-white/5 rounded-md p-1.5 border border-white/5 flex items-center justify-between mt-auto">
              <div className="flex items-center gap-1">
                <Cpu size={8} className="text-brand-orange" />
                <span className="font-inter text-[7px] text-white/60">Projet IA</span>
              </div>
              <div className="flex-1 mx-2 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-brand-orange to-electric-500 rounded-full" />
              </div>
              <span className="font-inter text-[7px] text-white/60">75%</span>
            </div>
          </div>
        </div>

        {/* Laptop base */}
        <div className="w-80 h-2 bg-gradient-to-b from-navy-500 to-navy-600 rounded-b-xl mx-auto
          -ml-4 shadow-lg" />
        <div className="w-72 h-0.5 bg-navy-400/50 mx-auto" />
      </div>

      {/* ---- Floating dashboard card ---- */}
      <div
        className="absolute bottom-8 -left-2 z-20 pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <div className="glass-dark rounded-xl p-3 w-36 border border-white/10 shadow-2xl">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-brand-orange to-brand-orange-dark
              flex items-center justify-center">
              <TrendingUp size={12} className="text-white" />
            </div>
            <span className="font-poppins font-bold text-xs text-white">Analytics</span>
          </div>
          <div className="font-poppins font-black text-lg text-white">+40%</div>
          <div className="font-inter text-[9px] text-blue-200/60">vs mois dernier</div>
          {/* Mini sparkline */}
          <svg viewBox="0 0 80 20" className="w-full h-4 mt-1.5">
            <polyline
              points="0,18 15,12 30,14 45,6 60,8 75,3 80,5"
              fill="none"
              stroke="#ea570d"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* ---- Floating mobile card ---- */}
      <div
        className="absolute top-12 -left-4 z-20 pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <div className="w-16 h-28 rounded-xl bg-gradient-to-br from-navy-600 to-navy-800
          border-2 border-white/10 shadow-2xl overflow-hidden p-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-white/30 mx-auto mb-1" />
          <div className="space-y-1">
            <div className="h-1.5 bg-white/10 rounded-full w-3/4" />
            <div className="h-1.5 bg-brand-orange/30 rounded-full w-1/2" />
            <div className="h-6 bg-white/5 rounded-md mt-2" />
            <div className="h-1.5 bg-white/10 rounded-full w-2/3" />
            <div className="h-1.5 bg-electric-500/30 rounded-full w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}
