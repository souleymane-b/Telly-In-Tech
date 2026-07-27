import { useEffect, useState } from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  /** milliseconds before the reveal starts */
  delay?: number;
  /** seconds between each word */
  stagger?: number;
}

export default function SplitText({ text, className = '', delay = 0, stagger = 0.06 }: SplitTextProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // delay is in ms — fire the state change after that long
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const words = text.split(' ');

  return (
    <span className={className} style={{ display: 'inline-block' }}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', marginRight: '0.25em', overflow: 'hidden' }}>
          <span
            style={{
              display: 'inline-block',
              // visible triggers the transition — stagger is purely in seconds (small value)
              transform: visible ? 'translateY(0)' : 'translateY(110%)',
              opacity: visible ? 1 : 0,
              transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
              // stagger each word by `stagger` seconds — NO ms/s mixing here
              transitionDelay: `${wi * stagger}s`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}
