import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const WHATSAPP_NUMBER = '212680318003';
const EMAIL = 'contact@carzio.ma';

export default function Contact() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    try {
      const res = await fetch(`/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || 'Server error');
      setSent(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to send message. Please try again.';
      console.error('Failed to save contact:', err);
      setSubmitError(msg);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/10 to-black" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-gold/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-white font-heading text-3xl md:text-4xl font-bold mb-3 tracking-tight">{t('contact.mapTitle')}</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm md:text-base">
            {t('contact.mapSubtitle')}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden glass mb-12"
        >
          <iframe
            src="https://www.google.com/maps?q=Agadir+Airport+Al+Massira&output=embed"
            width="100%"
            height="400"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Agadir Airport - Al Massira"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-white font-heading text-xl font-bold mb-6 tracking-tight">{t('contact.getInTouch')}</h3>
            <p className="text-white/50 mb-8">
              {t('contact.helpText')}
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 glass-gold rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t('contact.ourAddress')}</p>
                  <p className="text-white/50 text-sm">{t('contact.addressValue')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 glass-gold rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t('contact.callUs')}</p>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-white/50 text-sm hover:text-gold transition">{t('contact.phoneValue')}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 glass-gold rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t('contact.emailUs')}</p>
                  <a href={`mailto:${EMAIL}`} className="text-white/50 text-sm hover:text-gold transition">{t('contact.emailValue')}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 glass-gold rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t('contact.workingHours')}</p>
                  <p className="text-white/50 text-sm">{t('contact.hoursValue')}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-gold text-white font-semibold px-6 py-2.5 rounded-xl transition text-sm hover:bg-gold/20 hover:shadow-lg hover:shadow-gold/20"
              >
                {t('contact.whatsapp')}
              </a>
              <a
                href="https://www.google.com/maps?q=Agadir+Airport+Al+Massira"
                target="_blank"
                rel="noopener noreferrer"
                className="glass text-white/80 font-semibold px-6 py-2.5 rounded-xl transition text-sm hover:bg-white/10"
              >
                {t('contact.directions')}
              </a>
            </div>
          </div>
          <div>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-10 text-center"
              >
                <div className="w-14 h-14 bg-green-900/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-white font-heading font-bold text-lg mb-2">{t('contact.messageSent')}</h3>
                <p className="text-white/50 text-sm mb-4">{t('contact.messageSentDesc')}</p>
                <button onClick={() => setSent(false)} className="text-gold hover:text-gold-light font-medium text-sm">
                  {t('contact.sendAnother')}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-1">{t('contact.fullName')}</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-black/40 text-white border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:border-gold focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-1">{t('contact.email')}</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-black/40 text-white border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:border-gold focus:outline-none transition"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-white/60 text-sm font-medium mb-1">{t('contact.phoneNumber')}</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-black/40 text-white border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:border-gold focus:outline-none transition"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white/60 text-sm font-medium mb-1">{t('contact.message')}</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    className="w-full bg-black/40 text-white border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:border-gold focus:outline-none resize-none transition"
                  />
                </div>
                {submitError && (
                  <p className="text-red-400 text-sm text-center mb-3">{submitError}</p>
                )}
                <button
                  type="submit"
                  className="w-full glass-gold text-white font-semibold py-2.5 rounded-xl transition text-sm hover:bg-gold/20 hover:shadow-lg hover:shadow-gold/20"
                >
                  {t('contact.sendMessage')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
