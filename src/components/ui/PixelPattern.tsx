import React from 'react';

interface PixelPatternProps {
  className?: string;
  opacity?: number;
  dark?: boolean;
}

export default function PixelPattern({ className = '', opacity = 0.08, dark = false }: PixelPatternProps) {
  const pixels = [
    { x: 5, y: 8, size: 10, color: dark ? '#0c71b9' : '#212d55' },
    { x: 15, y: 3, size: 6, color: dark ? '#ea570d' : '#0c71b9' },
    { x: 25, y: 12, size: 8, color: dark ? '#212d55' : '#ea570d' },
    { x: 35, y: 5, size: 12, color: dark ? '#0c71b9' : '#212d55' },
    { x: 45, y: 15, size: 6, color: dark ? '#ea570d' : '#0c71b9' },
    { x: 55, y: 2, size: 10, color: dark ? '#212d55' : '#ea570d' },
    { x: 65, y: 10, size: 8, color: dark ? '#0c71b9' : '#212d55' },
    { x: 75, y: 6, size: 6, color: dark ? '#ea570d' : '#0c71b9' },
    { x: 85, y: 14, size: 12, color: dark ? '#212d55' : '#ea570d' },
    { x: 92, y: 4, size: 8, color: dark ? '#0c71b9' : '#212d55' },
    { x: 10, y: 25, size: 6, color: dark ? '#ea570d' : '#0c71b9' },
    { x: 20, y: 30, size: 10, color: dark ? '#212d55' : '#ea570d' },
    { x: 30, y: 22, size: 8, color: dark ? '#0c71b9' : '#212d55' },
    { x: 40, y: 35, size: 6, color: dark ? '#ea570d' : '#0c71b9' },
    { x: 50, y: 28, size: 10, color: dark ? '#212d55' : '#ea570d' },
    { x: 60, y: 40, size: 8, color: dark ? '#0c71b9' : '#212d55' },
    { x: 70, y: 20, size: 6, color: dark ? '#ea570d' : '#0c71b9' },
    { x: 80, y: 32, size: 12, color: dark ? '#212d55' : '#ea570d' },
    { x: 90, y: 25, size: 8, color: dark ? '#0c71b9' : '#212d55' },
    { x: 8, y: 50, size: 10, color: dark ? '#ea570d' : '#0c71b9' },
    { x: 18, y: 45, size: 6, color: dark ? '#212d55' : '#ea570d' },
    { x: 28, y: 55, size: 8, color: dark ? '#0c71b9' : '#212d55' },
    { x: 38, y: 48, size: 12, color: dark ? '#ea570d' : '#0c71b9' },
    { x: 48, y: 60, size: 6, color: dark ? '#212d55' : '#ea570d' },
    { x: 58, y: 52, size: 10, color: dark ? '#0c71b9' : '#212d55' },
    { x: 68, y: 65, size: 8, color: dark ? '#ea570d' : '#0c71b9' },
    { x: 78, y: 45, size: 6, color: dark ? '#212d55' : '#ea570d' },
    { x: 88, y: 58, size: 12, color: dark ? '#0c71b9' : '#212d55' },
    { x: 3, y: 70, size: 8, color: dark ? '#ea570d' : '#0c71b9' },
    { x: 13, y: 75, size: 10, color: dark ? '#212d55' : '#ea570d' },
    { x: 23, y: 68, size: 6, color: dark ? '#0c71b9' : '#212d55' },
    { x: 33, y: 80, size: 8, color: dark ? '#ea570d' : '#0c71b9' },
    { x: 43, y: 72, size: 12, color: dark ? '#212d55' : '#ea570d' },
    { x: 53, y: 85, size: 6, color: dark ? '#0c71b9' : '#212d55' },
    { x: 63, y: 78, size: 10, color: dark ? '#ea570d' : '#0c71b9' },
    { x: 73, y: 90, size: 8, color: dark ? '#212d55' : '#ea570d' },
    { x: 83, y: 70, size: 6, color: dark ? '#0c71b9' : '#212d55' },
    { x: 93, y: 82, size: 12, color: dark ? '#ea570d' : '#0c71b9' },
    { x: 7, y: 92, size: 8, color: dark ? '#212d55' : '#ea570d' },
    { x: 17, y: 88, size: 6, color: dark ? '#0c71b9' : '#212d55' },
    { x: 27, y: 95, size: 10, color: dark ? '#ea570d' : '#0c71b9' },
    { x: 37, y: 96, size: 8, color: dark ? '#212d55' : '#ea570d' },
    { x: 47, y: 92, size: 6, color: dark ? '#0c71b9' : '#212d55' },
    { x: 57, y: 97, size: 12, color: dark ? '#ea570d' : '#0c71b9' },
    { x: 67, y: 88, size: 8, color: dark ? '#212d55' : '#ea570d' },
    { x: 77, y: 94, size: 6, color: dark ? '#0c71b9' : '#212d55' },
    { x: 87, y: 96, size: 10, color: dark ? '#ea570d' : '#0c71b9' },
    { x: 97, y: 90, size: 8, color: dark ? '#212d55' : '#ea570d' },
  ];

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 100 100"
      >
        {pixels.map((p, i) => (
          <rect
            key={i}
            x={p.x}
            y={p.y}
            width={p.size / 10}
            height={p.size / 10}
            fill={p.color}
            rx={0.1}
          />
        ))}
      </svg>
    </div>
  );
}
