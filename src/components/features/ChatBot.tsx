import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface Message {
  id: number;
  text: string;
  from: 'bot' | 'user';
  time: string;
}

const botReplies: Record<string, string[]> = {
  service: [
    'Nous proposons : création web, applications mobiles, marketing digital, conseil IT, formation digitale et cybersécurité.',
    'Quel service vous intéresse en particulier ? Je peux vous donner plus de détails.',
  ],
  prix: [
    'Nos tarifs sont adaptés à la réalité économique locale. Pour un devis précis, contactez-nous à contact@tellyintech.com',
    'Nous proposons des formules flexibles selon votre budget. Vous pouvez demander un devis gratuit.',
  ],
  contact: [
    'Vous pouvez nous joindre par email : contact@tellyintech.com ou par téléphone : +224 620 00 00 00',
    'Nos bureaux sont à Dakar (Sénégal) et Conakry (Guinée). Quelle est votre localisation ?',
  ],
  default: [
    'Merci pour votre message ! Notre équipe vous répondra dans les plus brefs délais.',
    'Pour toute question spécifique, n\'hésitez pas à nous contacter directement à contact@tellyintech.com',
    'Pouvez-vous préciser votre besoin ? Je suis là pour vous aider.',
  ],
};

function getReply(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('service') || lower.includes('offre') || lower.includes('que faites')) {
    return botReplies.service[Math.floor(Math.random() * botReplies.service.length)];
  }
  if (lower.includes('prix') || lower.includes('tarif') || lower.includes('coût') || lower.includes('devis')) {
    return botReplies.prix[Math.floor(Math.random() * botReplies.prix.length)];
  }
  if (lower.includes('contact') || lower.includes('joindre') || lower.includes('téléphone') || lower.includes('email')) {
    return botReplies.contact[Math.floor(Math.random() * botReplies.contact.length)];
  }
  return botReplies.default[Math.floor(Math.random() * botReplies.default.length)];
}

export default function ChatBot() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: t.chatbot.greeting, from: 'bot', time: new Date().toLocaleTimeString('fr', { hour: '2-digit', minute: '2-digit' }) },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: messages.length + 1,
      text: input,
      from: 'user',
      time: new Date().toLocaleTimeString('fr', { hour: '2-digit', minute: '2-digit' }),
    };

    const userInput = input;
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const reply: Message = {
        id: messages.length + 2,
        text: getReply(userInput),
        from: 'bot',
        time: new Date().toLocaleTimeString('fr', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, reply]);
      setTyping(false);
    }, 1200 + Math.random() * 800);
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 bg-navy rounded-full flex items-center
          justify-center shadow-brand-lg hover:shadow-xl hover:scale-110 transition-all duration-300
          group"
        aria-label="Ouvrir le chat"
      >
        {open
          ? <ChevronDown size={22} className="text-white" />
          : <MessageSquare size={22} className="text-white" />
        }
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-orange rounded-full
            text-white text-[9px] font-bold flex items-center justify-center">1</span>
        )}
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-5 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-brand-lg
          overflow-hidden transition-all duration-400 origin-bottom-right
          ${open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-navy to-electric-500 px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            <Bot size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-poppins font-semibold text-white text-sm">{t.chatbot.title}</p>
            <p className="font-inter text-white/70 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              En ligne
            </p>
          </div>
          <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="h-64 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.from === 'bot' && (
                <div className="w-6 h-6 rounded-full bg-navy flex items-center justify-center
                  flex-shrink-0 mr-2 mt-0.5">
                  <Bot size={12} className="text-white" />
                </div>
              )}
              <div className={`max-w-[75%] rounded-2xl px-3 py-2 ${
                msg.from === 'user'
                  ? 'bg-navy text-white rounded-br-sm'
                  : 'bg-white text-gray-700 rounded-bl-sm shadow-sm'
              }`}>
                <p className="font-inter text-xs leading-relaxed">{msg.text}</p>
                <p className={`font-inter text-[10px] mt-1 ${
                  msg.from === 'user' ? 'text-white/60' : 'text-gray-400'
                }`}>{msg.time}</p>
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="w-6 h-6 rounded-full bg-navy flex items-center justify-center mr-2 mt-0.5">
                <Bot size={12} className="text-white" />
              </div>
              <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex gap-1">
                {[0, 1, 2].map(i => (
                  <span key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick replies */}
        <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto">
          {['Nos services', 'Nos tarifs', 'Nous contacter'].map(q => (
            <button
              key={q}
              onClick={() => { setInput(q); }}
              className="flex-shrink-0 text-xs font-inter text-navy border border-navy/20
                rounded-full px-3 py-1 hover:bg-navy hover:text-white transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-3 py-3 bg-white border-t border-gray-100 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder={t.chatbot.placeholder}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2
              font-inter text-xs text-gray-700 placeholder-gray-400 focus:outline-none
              focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors"
          />
          <button
            onClick={sendMessage}
            className="w-9 h-9 bg-brand-orange rounded-full flex items-center justify-center
              hover:bg-brand-orange-dark transition-colors flex-shrink-0"
          >
            <Send size={14} className="text-white" />
          </button>
        </div>
      </div>
    </>
  );
}
