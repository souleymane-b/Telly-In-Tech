import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export default function CookieBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('telly_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('telly_cookie_consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('telly_cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-navy text-white rounded-2xl shadow-brand-lg p-5
        flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-up">
        <div className="flex-shrink-0 w-10 h-10 bg-brand-orange/20 rounded-full flex items-center justify-center">
          <Cookie size={20} className="text-brand-orange" />
        </div>
        <p className="font-inter text-sm text-gray-300 flex-1 leading-relaxed">
          {t.cookie.message}
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="font-inter text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5"
          >
            {t.cookie.decline}
          </button>
          <button
            onClick={accept}
            className="font-poppins font-semibold text-sm bg-brand-orange text-white
              px-5 py-2 rounded-full hover:bg-brand-orange-dark transition-colors"
          >
            {t.cookie.accept}
          </button>
          <button onClick={decline} className="text-gray-500 hover:text-white transition-colors ml-1">
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
