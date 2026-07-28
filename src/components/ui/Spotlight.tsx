import { useEffect, useRef, useState } from 'react';

interface SpotlightProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function Spotlight({
  className = '',
  size = 600,
  color = 'rgba(255, 255, 255, 0.08)',
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove);
    const parent = ref.current?.parentElement;
    parent?.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      parent?.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        background: `radial-gradient(circle ${size}px at ${pos.x}px ${pos.y}px, ${color}, transparent 70%)`,
      }}
      aria-hidden="true"
    />
  );
}
