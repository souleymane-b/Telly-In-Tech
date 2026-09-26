import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, X, Send, Bot, ChevronDown, Loader2 } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface Message { id: number; text: string; from: 'bot' | 'user' }

export default function ChatBot() {
  const { t, lang } = useLanguage();
  const fr = lang === 'fr';
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState('');
  const [error, setError] = useState('');
  const busy = useRef(false);
  const controller = useRef<AbortController | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const nextId = useRef(0);

  useEffect(() => () => controller.current?.abort(), []);
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  useEffect(() => {
    if (open && listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, pending, open, error]);

  const close = () => { setOpen(false); toggleRef.current?.focus(); };
  const sendMessage = async (text = input) => {
    const value = text.trim();
    if (!value || busy.current) return;
    busy.current = true;
    setPending(value);
    setInput('');
    setError('');
    const abort = new AbortController();
    controller.current = abort;
    const timeout = window.setTimeout(() => abort.abort(), 25000);
    try {
      const history = messages.slice(-10).map(message => ({
        role: message.from === 'bot' ? 'assistant' : 'user',
        content: message.text.slice(0, 1500),
      }));
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...history, { role: 'user', content: value }] }),
        signal: abort.signal,
      });
      if (!response.ok) throw new Error(response.status === 429 ? 'busy' : 'unavailable');
      const result = await response.json();
      if (typeof result.reply !== 'string' || !result.reply.trim()) throw new Error('unavailable');
      const userId = nextId.current++;
      const replyId = nextId.current++;
      setMessages(previous => [...previous, { id: userId, text: value, from: 'user' }, { id: replyId, text: result.reply, from: 'bot' }].slice(-40) as Message[]);
    } catch (err) {
      setInput(value);
      setError(err instanceof Error && err.message === 'busy'
        ? (fr ? 'Trop de demandes. Réessayez dans une minute.' : 'Too many requests. Please try again in a minute.')
        : (fr ? 'L’assistant IA est indisponible. Réessayez ou contactez notre équipe.' : 'The AI assistant is unavailable. Try again or contact our team.'));
    } finally {
      window.clearTimeout(timeout);
      busy.current = false;
      setPending('');
      controller.current = null;
    }
  };

  const quickReplies = fr ? ['Nos services', 'Demander un devis', 'Nos réalisations'] : ['Our services', 'Request a quote', 'Our projects'];

  return (
    <>
      <button ref={toggleRef} onClick={() => setOpen(!open)}
        aria-expanded={open} aria-controls="telly-chat"
        aria-label={open ? (fr ? 'Fermer le chat' : 'Close chat') : (fr ? 'Ouvrir le chat' : 'Open chat')}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 bg-navy rounded-full flex items-center justify-center shadow-brand-lg hover:scale-105 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange">
        {open ? <ChevronDown size={22} className="text-white" /> : <MessageSquare size={22} className="text-white" />}
      </button>
      {open && (
        <section id="telly-chat" role="dialog" aria-modal="false" aria-labelledby="telly-chat-title"
          onKeyDown={event => { if (event.key === 'Escape') close(); }}
          className="fixed bottom-24 right-3 sm:right-5 z-50 w-[calc(100vw-1.5rem)] sm:w-96 max-h-[calc(100dvh-7rem)] flex flex-col bg-white dark:bg-navy-800 rounded-2xl shadow-brand-lg overflow-hidden border border-gray-100 dark:border-navy-700">
          <div className="bg-gradient-to-r from-navy to-electric-500 px-4 py-4 flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center"><Bot size={22} className="text-white" /></div>
            <div className="flex-1">
              <h2 id="telly-chat-title" className="font-poppins font-semibold text-white text-sm">{t.chatbot.title}</h2>
              <p className="font-inter text-white/80 text-xs">{fr ? 'Assistant IA' : 'AI assistant'}</p>
            </div>
            <button onClick={close} aria-label={fr ? 'Fermer le chat' : 'Close chat'} className="p-2 text-white/80 hover:text-white"><X size={18} /></button>
          </div>
          <div ref={listRef} role="log" aria-live="polite" aria-relevant="additions text" aria-label={fr ? 'Conversation' : 'Conversation'}
            className="min-h-0 h-72 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-navy-900">
            <div className="bg-white dark:bg-navy-700 text-gray-700 dark:text-gray-100 rounded-2xl rounded-bl-sm p-3 text-sm shadow-sm">{t.chatbot.greeting}</div>
            {messages.map(message => (
              <div key={message.id} className={'flex ' + (message.from === 'user' ? 'justify-end' : 'justify-start')}>
                <div className={'max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap break-words ' + (message.from === 'user' ? 'bg-navy text-white rounded-br-sm' : 'bg-white dark:bg-navy-700 text-gray-700 dark:text-gray-100 rounded-bl-sm shadow-sm')}>
                  {message.text}
                </div>
              </div>
            ))}
            {pending && <div className="space-y-3">
              <div className="flex justify-end"><p className="max-w-[90%] bg-navy text-white rounded-2xl rounded-br-sm px-3 py-2 text-sm break-words">{pending}</p></div>
              <p role="status" className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300"><Loader2 size={14} className="animate-spin" />{fr ? 'L’assistant réfléchit…' : 'Thinking…'}</p>
            </div>}
            {error && <div role="alert" className="rounded-xl bg-orange-50 text-orange-900 p-3 text-xs leading-relaxed">{error}{' '}
              <Link to="/contact" onClick={close} className="font-semibold underline">{fr ? 'Contacter l’équipe' : 'Contact our team'}</Link>
            </div>}
          </div>
          <div className="flex flex-wrap gap-2 px-3 pt-3 shrink-0">
            {quickReplies.map(question => <button key={question} disabled={!!pending} onClick={() => void sendMessage(question)}
              className="text-xs text-navy dark:text-gray-200 border border-gray-200 dark:border-navy-600 rounded-full px-3 py-1.5 hover:border-brand-orange disabled:opacity-50">{question}</button>)}
          </div>
          <form onSubmit={event => { event.preventDefault(); void sendMessage(); }} className="flex gap-2 px-3 pt-3 shrink-0">
            <input ref={inputRef} type="text" value={input} maxLength={1500} disabled={!!pending}
              onChange={event => setInput(event.target.value)} aria-label={t.chatbot.placeholder} placeholder={t.chatbot.placeholder}
              className="min-w-0 flex-1 bg-gray-50 dark:bg-navy-900 border border-gray-200 dark:border-navy-600 rounded-full px-4 py-2 font-inter text-sm text-gray-700 dark:text-white focus:outline-none focus:border-electric-500 disabled:opacity-50" />
            <button type="submit" disabled={!!pending || !input.trim()} aria-label={t.chatbot.send}
              className="w-10 h-10 bg-brand-orange text-white rounded-full flex items-center justify-center disabled:opacity-40 shrink-0"><Send size={16} /></button>
          </form>
          <p className="px-4 py-3 text-[10px] leading-relaxed text-gray-500 dark:text-gray-400 shrink-0">
            {fr ? 'Vos messages sont envoyés à Google Gemini pour répondre. Évitez les données sensibles. L’IA peut se tromper.' : 'Your messages are sent to Google Gemini to generate replies. Avoid sensitive information. AI can make mistakes.'}
          </p>
        </section>
      )}
    </>
  );
}
