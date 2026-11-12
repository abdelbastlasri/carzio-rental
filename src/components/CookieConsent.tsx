import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LangLink from './LangLink';
import { saveConsent, storedConsent } from '../lib/analytics';

export default function CookieConsent() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(storedConsent() === null);
  }, []);

  if (!visible) return null;

  const choose = (value: 'granted' | 'denied') => {
    saveConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t('cookie.title', 'Cookies and privacy')}
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-white/10 bg-zinc-950/95 px-4 py-4 shadow-2xl backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-3xl">
          <p className="font-heading text-sm font-semibold text-white">
            {t('cookie.title', 'Cookies and privacy')}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-white/60">
            {t(
              'cookie.text',
              'We use cookies to analyse traffic and improve your booking experience. You can accept or reject non-essential cookies.',
            )}{' '}
            <LangLink to="/privacy" className="text-gold underline hover:text-gold-light">
              {t('cookie.privacy', 'Privacy policy')}
            </LangLink>
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose('denied')}
            className="rounded-lg border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
          >
            {t('cookie.reject', 'Reject')}
          </button>
          <button
            type="button"
            onClick={() => choose('granted')}
            className="rounded-lg bg-gold px-4 py-2 text-xs font-semibold text-black transition hover:bg-gold-light"
          >
            {t('cookie.accept', 'Accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
