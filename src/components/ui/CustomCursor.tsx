import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let ringX = -100, ringY = -100;
    let dotX = -100, dotY = -100;
    let targetX = -100, targetY = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"]');
      setHovering(!!isInteractive);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const animate = () => {
      // Dot follows instantly
      dotX = targetX;
      dotY = targetY;
      // Ring follows with lag (lerp)
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX - 3}px, ${dotY - 3}px, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border-2 rounded-full pointer-events-none z-[9999]
          transition-[width,height,opacity] duration-200"
        style={{
          borderColor: hovering ? '#ea570d' : 'rgba(12, 113, 185, 0.6)',
          width: clicking ? '12px' : hovering ? '40px' : '32px',
          height: clicking ? '12px' : hovering ? '40px' : '32px',
          marginLeft: hovering ? '-4px' : '0px',
          marginTop: hovering ? '-4px' : '0px',
          opacity: position.x < 0 ? 0 : 1,
        }}
      />
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999]
          bg-brand-orange"
        style={{ opacity: position.x < 0 ? 0 : 1 }}
      />
    </>
  );
}
