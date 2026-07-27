import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import PixelPattern from '@/components/ui/PixelPattern';
import { supabase } from '@/lib/supabase';

export default function Contact() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: form.name,
        company: form.company || null,
        email: form.email,
        phone: form.phone || null,
        service: form.service || null,
        message: form.message,
      });

      if (error) throw error;

      setStatus('success');
      setForm({ name: '', company: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      console.error('Contact form error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  const contactInfo = [
    { icon: Mail, label: t.contact.email_label, value: 'contact@tellyintech.com', href: 'mailto:contact@tellyintech.com', color: 'orange' },
    { icon: Phone, label: t.contact.phone_label, value: '+224 620 00 00 00', href: 'tel:+224620000000', color: 'blue' },
    { icon: MapPin, label: t.contact.location_label, value: t.contact.address, href: '#', color: 'orange' },
  ];

  const serviceOptions = [
    t.services.web.title,
    t.services.mobile.title,
    t.services.marketing.title,
    t.services.conseil.title,
    t.services.formation.title,
    t.services.cyber.title,
  ];

  return (
    <>
      {/* Header */}
      <section className="relative pt-32 pb-16 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-700 to-electric-700 opacity-95" />
        <PixelPattern dark opacity={0.25} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-brand-orange mb-3">
            {t.contact.subtitle}
          </p>
          <h1 className="font-poppins font-black text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            {t.contact.title}
          </h1>
          <p className="font-inter text-base md:text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            {t.contact.description}
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section ref={sectionRef as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-white dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Info column */}
            <div className="lg:col-span-2 animate-on-scroll-left">
              <h2 className="font-poppins font-bold text-2xl text-navy dark:text-white mb-2">
                Contactez-nous
              </h2>
              <p className="font-inter text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                Notre équipe vous répond dans les 24 heures. Parlons de votre projet.
              </p>

              <div className="space-y-5">
                {contactInfo.map((info, i) => {
                  const Icon = info.icon;
                  const isOrange = info.color === 'orange';
                  return (
                    <a
                      key={i}
                      href={info.href}
                      className="flex items-start gap-4 group"
                    >
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center
                        transition-all duration-300 group-hover:scale-110 ${
                          isOrange
                            ? 'bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white'
                            : 'bg-electric-500/10 text-electric-500 group-hover:bg-electric-500 group-hover:text-white'
                        }`}>
                        <Icon size={22} />
                      </div>
                      <div className="pt-1">
                        <p className="font-inter text-xs text-gray-400 dark:text-gray-500 mb-0.5">
                          {info.label}
                        </p>
                        <p className="font-poppins font-medium text-sm text-navy dark:text-white
                          group-hover:text-brand-orange transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Social proof */}
              <div className="mt-10 p-5 bg-gray-50 dark:bg-navy-800 rounded-2xl border border-gray-100 dark:border-navy-700">
                <p className="font-inter text-sm text-gray-600 dark:text-gray-300 italic">
                  "Un accompagnement humain et professionnel. Telly InTech a compris nos besoins et livré au-delà de nos attentes."
                </p>
                <p className="font-poppins font-semibold text-xs text-navy dark:text-white mt-3">
                  — Aissatou Barry, ONG Femme Active
                </p>
              </div>
            </div>

            {/* Form column */}
            <div className="lg:col-span-3 animate-on-scroll-right">
              <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-navy-800 rounded-2xl p-6 md:p-8
                border border-gray-100 dark:border-navy-700">

                {/* Status messages */}
                {status === 'success' && (
                  <div className="mb-6 flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800
                    rounded-xl p-4 animate-fade-in">
                    <CheckCircle size={20} className="text-green-600 dark:text-green-400 flex-shrink-0" />
                    <p className="font-inter text-sm text-green-700 dark:text-green-300">{t.contact.success}</p>
                  </div>
                )}
                {status === 'error' && (
                  <div className="mb-6 flex items-center gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800
                    rounded-xl p-4 animate-fade-in">
                    <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0" />
                    <p className="font-inter text-sm text-red-700 dark:text-red-300">{t.contact.error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-inter text-xs font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                      {t.contact.name} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-white dark:bg-navy-700 border border-gray-200 dark:border-navy-600
                        rounded-xl px-4 py-3 font-inter text-sm text-gray-700 dark:text-white
                        focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500
                        transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-inter text-xs font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                      {t.contact.company}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full bg-white dark:bg-navy-700 border border-gray-200 dark:border-navy-600
                        rounded-xl px-4 py-3 font-inter text-sm text-gray-700 dark:text-white
                        focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500
                        transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-inter text-xs font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                      {t.contact.email} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-white dark:bg-navy-700 border border-gray-200 dark:border-navy-600
                        rounded-xl px-4 py-3 font-inter text-sm text-gray-700 dark:text-white
                        focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500
                        transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-inter text-xs font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                      {t.contact.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full bg-white dark:bg-navy-700 border border-gray-200 dark:border-navy-600
                        rounded-xl px-4 py-3 font-inter text-sm text-gray-700 dark:text-white
                        focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500
                        transition-colors"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block font-inter text-xs font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                    {t.contact.service}
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-navy-700 border border-gray-200 dark:border-navy-600
                      rounded-xl px-4 py-3 font-inter text-sm text-gray-700 dark:text-white
                      focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500
                      transition-colors"
                  >
                    <option value="">Sélectionnez un service</option>
                    {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block font-inter text-xs font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                    {t.contact.message} *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-navy-700 border border-gray-200 dark:border-navy-600
                      rounded-xl px-4 py-3 font-inter text-sm text-gray-700 dark:text-white
                      focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500
                      transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-dark
                    text-white font-poppins font-semibold px-6 py-3.5 rounded-full transition-all duration-300
                    hover:shadow-orange hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60
                    disabled:cursor-not-allowed text-sm"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      {t.contact.sending}
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      {t.contact.send}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
