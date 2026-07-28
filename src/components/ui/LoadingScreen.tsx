import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [phase, setPhase] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    // Phase 0: logo
    // Phase 1: rings
    timers.push(setTimeout(() => setPhase(1), 300));
    // Phase 2: particles + laptop
    timers.push(setTimeout(() => setPhase(2), 700));
    // Phase 3: title
    timers.push(setTimeout(() => setPhase(3), 1100));
    // Phase 4: buttons
    timers.push(setTimeout(() => setPhase(4), 1500));
    // Phase 5: stats — fade out loader
    timers.push(setTimeout(() => setPhase(5), 1900));
    timers.push(setTimeout(() => setDone(true), 2400));

    return () => timers.forEach(clearTimeout);
  }, []);

  if (done) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-navy transition-opacity duration-500"
      style={{ opacity: phase >= 5 ? 0 : 1, pointerEvents: phase >= 5 ? 'none' : 'auto' }}
    >
      {/* Kinetic gradient bg */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #212d55, #1a2444, #0c71b9, #1a2444, #212d55)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 8s ease infinite',
        }}
      />

      <div className="relative flex flex-col items-center gap-6">
        {/* Logo "TI" */}
        <div
          className="transition-all duration-500"
          style={{
            opacity: phase >= 0 ? 1 : 0,
            transform: phase >= 0 ? 'scale(1)' : 'scale(0.5)',
          }}
        >
          <div className="relative">
            <div className="font-poppins font-black text-5xl text-white">TI</div>
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-orange to-electric-500
              rounded-full" />
          </div>
        </div>

        {/* Rings */}
        <div
          className="relative w-24 h-24 transition-all duration-500"
          style={{ opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? 'scale(1)' : 'scale(0.3)' }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
            <circle cx="50" cy="50" r="46" fill="none" stroke="#ea570d" strokeWidth="1.5" strokeDasharray="3 6" />
          </svg>
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-spin-reverse">
            <circle cx="50" cy="50" r="38" fill="none" stroke="#0c71b9" strokeWidth="1.5" strokeDasharray="2 5" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-brand-orange rounded-full animate-glow-pulse" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-40 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-orange to-electric-500 rounded-full transition-all duration-1500 ease-out"
            style={{ width: phase >= 4 ? '100%' : phase >= 2 ? '60%' : phase >= 1 ? '30%' : '10%' }}
          />
        </div>

        <p className="font-inter text-xs text-white/50 tracking-widest uppercase">Telly InTech</p>
      </div>
    </div>
  );
}
