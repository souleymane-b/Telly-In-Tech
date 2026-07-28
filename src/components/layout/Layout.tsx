import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from '@/components/features/WhatsAppButton';
import ChatBot from '@/components/features/ChatBot';
import CookieBanner from '@/components/features/CookieBanner';
import ScrollProgress from '@/components/ui/ScrollProgress';
import CustomCursor from '@/components/ui/CustomCursor';
import LoadingScreen from '@/components/ui/LoadingScreen';

interface LayoutProps {
  children: React.ReactNode;
}

const ANIM_CLASSES =
  '.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale, .reveal-mask';

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  // Global observer: catches ALL animation elements on the page as a safety net,
  // so nothing stays stuck at opacity:0 even if a section forgot to attach the ref.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll(ANIM_CLASSES).forEach((e) => e.classList.add('is-visible'));
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

    // Small delay so the new page content is mounted before we query
    const timer = setTimeout(() => {
      document.querySelectorAll(ANIM_CLASSES).forEach((e) => {
        if (!e.classList.contains('is-visible')) {
          observer.observe(e);
        }
      });
    }, 100);

    // Safety net: force-visible anything already in viewport after 800ms
    const safetyTimer = setTimeout(() => {
      document.querySelectorAll(ANIM_CLASSES).forEach((e) => {
        const rect = (e as HTMLElement).getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          e.classList.add('is-visible');
        }
      });
    }, 800);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      clearTimeout(safetyTimer);
    };
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main className="flex-1 page-enter" key={pathname}>
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatBot />
      <CookieBanner />
    </div>
  );
}
