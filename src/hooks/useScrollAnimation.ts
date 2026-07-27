import { useEffect, useRef } from 'react';

const ANIM_CLASSES = '.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale, .reveal-mask';

export function useScrollAnimation() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback: if IntersectionObserver isn't available, show everything
    if (!('IntersectionObserver' in window)) {
      el.querySelectorAll(ANIM_CLASSES).forEach((e) => e.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = el.querySelectorAll(ANIM_CLASSES);
    elements.forEach((e) => observer.observe(e));

    // Safety net: if elements are already in viewport but observer hasn't fired yet,
    // force them visible after a short delay (handles edge cases on page load)
    const safetyTimer = setTimeout(() => {
      el.querySelectorAll(ANIM_CLASSES).forEach((e) => {
        const rect = (e as HTMLElement).getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          e.classList.add('is-visible');
        }
      });
    }, 300);

    return () => {
      observer.disconnect();
      clearTimeout(safetyTimer);
    };
  }, []);

  return ref;
}
