import { type ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
}

export default function Marquee({ children, reverse = false, className = '' }: MarqueeProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className={reverse ? 'marquee-container-reverse' : 'marquee-container'}>
        {/* Duplicate content for seamless loop */}
        <div className="flex items-center gap-12 pr-12">{children}</div>
        <div className="flex items-center gap-12 pr-12" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
