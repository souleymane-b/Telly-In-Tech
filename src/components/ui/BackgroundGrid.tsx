interface BackgroundGridProps {
  className?: string;
  opacity?: number;
  size?: number;
}

export default function BackgroundGrid({
  className = '',
  opacity = 0.03,
  size = 40,
}: BackgroundGridProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        opacity,
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`,
      }}
      aria-hidden="true"
    />
  );
}
