import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const WHATSAPP_NUMBER = '212680318003';
const PHONE_DISPLAY = '+212 680-318003';
const PHONE_LINK = '+212680318003';
const EMAIL = 'contact@carzio.ma';

const iconClass = 'h-5 w-5 text-gold';

function AddressIcon() {
  return (
    <svg aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657 13.414 20.9a2 2 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="m3 8 7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

const inputClass =
  'min-h-11 w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-base text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold focus-visible:ring-2 focus-visible:ring-gold/40 sm:text-sm';

export default function Contact() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contacts', {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const details = [
    { label: t('contact.ourAddress'), value: t('contact.addressValue'), icon: <AddressIcon /> },
    {
      label: t('contact.callUs'),
      value: PHONE_DISPLAY,
      href: `tel:${PHONE_LINK}`,
      icon: <PhoneIcon />,
    },
    { label: t('contact.emailUs'), value: EMAIL, href: `mailto:${EMAIL}`, icon: <MailIcon /> },
    { label: t('contact.workingHours'), value: t('contact.hoursValue'), icon: <ClockIcon /> },
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-16 md:py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/10 to-black" />
      <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-gold/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            {t('contact.getInTouch')}
          </h2>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-white/55 md:text-base">
            {t('contact.helpText')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {details.map((detail) => (
            <div key={detail.label} className="glass flex min-w-0 items-start gap-3 rounded-2xl p-5">
              <div className="glass-gold flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                {detail.icon}
              </div>
              <div className="min-w-0">
                <h3 className="font-heading text-sm font-semibold text-white">{detail.label}</h3>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="mt-1 inline-block break-words text-sm text-white/55 transition-colors hover:text-gold focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <p className="mt-1 break-words text-sm leading-relaxed text-white/55">{detail.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-gold rounded-xl px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {t('contact.whatsapp')}
          </a>
          <a
            href="https://www.google.com/maps/place/CARZIO+Car+Rental+Agadir+Airport/@30.3316319,-9.4113071,18.5z/data=!4m16!1m9!3m8!1s0xafb78533426f6bf3:0x2ac9d1a9d4ba79e8!2sCARZIO+Car+Rental+Agadir+Airport!8m2!3d30.3315284!4d-9.4104744!9m1!1b1!16s%2Fg%2F11zbkvdfgj!3m5!1s0xafb78533426f6bf3:0x2ac9d1a9d4ba79e8!8m2!3d30.3315284!4d-9.4104744!16s%2Fg%2F11zbkvdfgj?entry=ttu&g_ep=EgoyMDI2MDUxNy4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-xl px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {t('contact.directions')}
          </a>
        </div>

        <div className="mx-auto mb-6 mt-16 max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">
            {t('contact.mapTitle')}
          </h2>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-white/50 md:text-base">
            {t('contact.mapSubtitle')}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass overflow-hidden rounded-2xl"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.0469!2d-9.4104744!3d30.3315284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xafb78533426f6bf3%3A0x2ac9d1a9d4ba79e8!2sCARZIO+Car+Rental+Agadir+Airport!5e0!3m2!1sen!2sma"
            width="100%"
            height="400"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Carzio — MAG N2, Agadir Airport"
          />
        </motion.div>

        <div className="mx-auto mt-16 max-w-3xl">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl p-10 text-center"
              role="status"
              aria-live="polite"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-green-900/50">
                <svg aria-hidden="true" className="h-7 w-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5 13 4 4L19 7" />
                </svg>
              </div>
              <h2 className="mb-2 font-heading text-lg font-bold text-white">{t('contact.messageSent')}</h2>
              <p className="mb-4 text-sm text-white/50">{t('contact.messageSentDesc')}</p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="rounded text-sm font-medium text-gold transition-colors hover:text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                {t('contact.sendAnother')}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8" noValidate={false}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-white/65">
                    {t('contact.fullName')}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-white/65">
                    {t('contact.email')}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    spellCheck={false}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-white/65">
                    {t('contact.phoneNumber')}
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-white/65">
                    {t('contact.message')}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className={`${inputClass} resize-y`}
                  />
                </div>
              </div>
              <div aria-live="polite">
                {submitError && (
                  <p role="alert" className="mt-4 text-sm text-red-400">
                    {submitError}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="glass-gold mt-6 min-h-11 w-full rounded-xl px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:cursor-wait disabled:opacity-60"
              >
                {isSubmitting ? `${t('contact.sendMessage')}…` : t('contact.sendMessage')}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
